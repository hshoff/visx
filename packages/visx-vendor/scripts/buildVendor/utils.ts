import path from 'path';

import packageJson from '../../package.json';

// types
/** Parsed representation of a vendored package */
export type VendoredPkg = {
  /** Name of the root node_modules/ package alias, e.g., vendor-d3-array. */
  npmAlias: string;
  /** Canonical name of the package, e.g., d3-array. */
  packageName: string;
  /** Whether this package is a types file. */
  isTypeFile: boolean;
  /** Fully-resolved path to transpiled vendor source in @visx/vendor. */
  vendorPath: string;
  /** Vendor path with src/index.js */
  vendorIndexFileName: string;
  /** Path of the vendored CJS package. This points to the transpiled vendor path. */
  cjsFileName: string;
  /** Path of the vendored ESM package. */
  esmFileName: string;
  /** Path of the vendored TS package (for TS files). */
  tsFileName?: string;
  /** */
  indexFileName: string;
  /** Fully-resolved path to root node_modules/ source. */
  nodeModulesPath: string;
};

/** Minimal representation of a package.json */
type PackageJson = {
  name: string;
  repository: { url: string };
};

// constants
export const DIRNAME = __dirname; // eslint-disable-line no-undef
export const ESM_DIR = 'esm/';
export const CJS_DIR = 'lib/';
const ROOT_PATH = path.resolve(DIRNAME, '../../');
export const TS_GLOB = path.resolve(ROOT_PATH, '*.d.ts');
export const INDEX_GLOB = path.resolve(ROOT_PATH, '*.js');
export const VENDOR_CJS_DIR = 'vendor-cjs/';

export const ESM_PATH = path.resolve(DIRNAME, `../../${ESM_DIR}`);
export const CJS_PATH = path.resolve(DIRNAME, `../../${CJS_DIR}`);
export const VENDOR_CJS_PATH = path.resolve(DIRNAME, `../../${VENDOR_CJS_DIR}`);
export const BABEL_CONFIG_FILE = path.resolve(DIRNAME, './babel.config.js');
export const ROOT_NODE_MODULES_PATH = path.resolve(DIRNAME, '../../../../node_modules/');

// vendor package metadata
const parseVendorPkgs = (pkgJsonDeps: {
  [dep: string]: string;
}): { [pkg: string]: VendoredPkg } => {
  // e.g. ['vendor-d3-array@npm:d3-array', ...]
  const pkgDependencies = Object.keys(pkgJsonDeps);

  // e.g., { 'd3-array': 'vendor-d3-array' }
  const pkgToAliasMap = Object.fromEntries(
    pkgDependencies.map((pkgJsonName) => {
      /**
       * Vendored packages are added as dependencies with aliases
       * to guarantee that we reference the correct version within the monorepo.
       * This parses these dependencies into the alias source path
       * and the actual package name.
       *
       * examples (note aliases cannot include `@` or `/`):
       *   d3-array        => vendor-d3-array@npm:d3-array
       *   @types/d3-array => vendor-types-d3-array@npm:@types/d3-array
       *
       */
      const [npmAlias, packageName] = pkgJsonName.split('@npm:');
      if (!npmAlias || !packageName) {
        throw new Error(`Could not parse vendor name ${pkgJsonName}`);
      }
      return [packageName, npmAlias]; // note: reversed from pkgJson entry
    }),
  );

  const result = Object.keys(pkgToAliasMap).reduce<{ [pkg: string]: VendoredPkg }>(
    (all, packageName) => {
      const npmAlias = pkgToAliasMap[packageName];
      const isTypeFile = packageName.includes('@types/');
      const pkg: VendoredPkg = {
        packageName,
        npmAlias,
        isTypeFile,
        tsFileName: isTypeFile
          ? `${ROOT_PATH}/${packageName.replace('@types/', '')}.d.ts`
          : undefined,
        esmFileName: `${ESM_PATH}/${packageName}.js`,
        cjsFileName: `${CJS_PATH}/${packageName}.js`,
        indexFileName: `${ROOT_PATH}/${packageName}.js`,
        vendorIndexFileName: `${VENDOR_CJS_PATH}/${npmAlias}/src/index.js`,
        vendorPath: `${VENDOR_CJS_PATH}/${npmAlias}`,
        nodeModulesPath: `${ROOT_NODE_MODULES_PATH}/${npmAlias}`,
      };

      all[packageName] = pkg;
      return all;
    },
    {},
  );

  return result;
};

export const parsedVendorPkgsMap = parseVendorPkgs(packageJson.dependencies);

const getLicenseUrl = (pkgJson: PackageJson) =>
  `${pkgJson.repository.url.replace(/\.git$/, '')}/blob/main/LICENSE`;

/** Generates the content of the vendored ESM package. */
export function getESMContent(pkgJson: PackageJson, pkg: VendoredPkg) {
  return `/**
 * \`@visx/vendor/${pkg.packageName}\` (ESM)
 * See upstream license: ${getLicenseUrl(pkgJson)}
 *
 * This ESM package re-exports the underlying installed dependencies of 
 * \`node_modules/${pkg.packageName}\` (aliased as \`${pkg.npmAlias}\`)
 */
export * from '${pkg.npmAlias}';`;
}

/** Generates the content of the vendored CJS package. */
export function getCJSContent(pkgJson: PackageJson, pkg: VendoredPkg) {
  return `/**
 * \`@visx/vendor/${pkg.packageName}\` (CommonJS)
 * See upstream license: ${getLicenseUrl(pkgJson)}
 *
 * This CJS package exports transpiled vendor files in \`${VENDOR_CJS_DIR}${pkg.npmAlias}\`
 */
module.exports = require('../${VENDOR_CJS_DIR}${pkg.npmAlias}/src/index.js');`;
}

/** Generates the content of the root index file which points to CJS. */
export function getIndexContent(pkgJson: PackageJson, pkg: VendoredPkg) {
  return `/**
 * \`@visx/vendor/${pkg.packageName}\` (CommonJS)
 * See upstream license: ${getLicenseUrl(pkgJson)}
 *
 * This file only exists for tooling that doesn't work yet with package.json:exports
 * by proxying through the CommonJS version.
 */
module.exports = require('./${VENDOR_CJS_DIR}${pkg.npmAlias}/src/index.js');`;
}

/** Generates the content of the vendored TS types. */
export function getTSContent(pkg: VendoredPkg) {
  return `/** \`@visx/vendor/${pkg.packageName}\` (TypeScript) 
 *
 * Re-exports the types from \`${pkg.packageName}\` 
 */
export * from '${pkg.npmAlias}';`;
}

// note: this is how we pass these dynamic variables into the
// babel config. it's not great but babel config files can't easily
// import from TS module files like this
process.env.VENDOR_CJS_PATH = VENDOR_CJS_PATH;
process.env.ROOT_NODE_MODULES_PATH = ROOT_NODE_MODULES_PATH;
process.env.VENDOR_PKG_MAP = JSON.stringify(parsedVendorPkgsMap);
