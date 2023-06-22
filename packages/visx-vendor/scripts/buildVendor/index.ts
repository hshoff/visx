/* eslint import/no-extraneous-dependencies: 'off' */
import chalk from 'chalk';
import childProcess from 'child_process';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import util from 'util';
import baseRimraf from 'rimraf';

import {
  parsedVendorPkgsMap,
  getESMContent,
  getCJSContent,
  BABEL_CONFIG_PATH,
  ESM_PATH,
  CJS_PATH,
  TS_PATH,
  VENDOR_CJS_PATH,
  ROOT_NODE_MODULES_PATH,
  getTSContent,
} from './utils';

const exec = util.promisify(childProcess.exec);
const rimraf = util.promisify(baseRimraf);

/**
 * Handles building the entire package, assuming correct (aliased) vendor packages are included
 * in the package.json and yarn installed in the monorepo root.
 */
async function build() {
  // print out packages to be vendored
  console.log(
    chalk.green(
      `👀 Vendoring the following packages\n  --${Object.values(parsedVendorPkgsMap)
        .map((pkg) => pkg.packageName)
        .sort()
        .join('\n  --')}`,
    ),
  );

  // validate that we can resolve all packages in (the root) node modules
  // they are aliased so they are guaranteed to be in the root
  Object.values(parsedVendorPkgsMap).forEach((pkg) => {
    const exists = fs.existsSync(pkg.nodeModulesPath);
    if (!exists) {
      throw new Error(
        `Module note found: ${pkg.packageName} (alias: ${pkg.vendorPath}, path: ${pkg.nodeModulesPath})`,
      );
    }
  });
  console.log(chalk.green('✅ Verified all packages are installed.'));

  // clean output directories
  const paths = [ESM_PATH, CJS_PATH, VENDOR_CJS_PATH, TS_PATH];

  console.log(chalk.green('🧹 Cleaning old vendor directories.'));
  await Promise.all(paths.map((glob) => rimraf(glob)));

  console.log(chalk.green('📁 Creating empty vendor directories.'));
  await Promise.all(paths.map((libPath) => fsPromises.mkdir(libPath, { recursive: true })));

  // transpile vendor packages to CJS
  console.log(chalk.green('🪄  Transpiling vendor sources to CJS'));

  // transpile the src/ of non-type files
  const transpileGlob = Object.values(parsedVendorPkgsMap)
    .filter((pkg) => !pkg.isTypeFile)
    .map((pkg) => `"${pkg.nodeModulesPath}/src/**/*.js"`)
    .join(',');

  const { stdout, stderr } = await exec(
    `babel \
      --config-file ${BABEL_CONFIG_PATH} \
      --only ${transpileGlob} \
      --out-dir ${VENDOR_CJS_PATH} \
      ${ROOT_NODE_MODULES_PATH}`,
  );

  if (stdout) {
    console.log(chalk.greenBright(`  ${stdout}`));
  }
  if (stderr) {
    console.log(chalk.redBright(`  ${stderr}`));
  }

  // write esm + cjs files, and copy licenses
  console.log(chalk.green('🏗️ Generating esm, cjs, and type files, and copying licenses.'));
  await Promise.all(
    Object.values(parsedVendorPkgsMap).map(async (pkg) => {
      console.log(chalk.green(`  -${pkg.packageName}`));

      if (pkg.isTypeFile) {
        await Promise.all([fsPromises.writeFile(`${pkg.tsPath}.d.ts`, getTSContent(pkg))]);
      } else {
        // paths
        const libVendorPath = pkg.vendorPath;
        const pkgJsonPath = path.join(pkg.nodeModulesPath, 'package.json');
        const srcLicensePath = path.join(pkg.nodeModulesPath, 'LICENSE');
        const vendorLicensePath = path.join(libVendorPath, 'LICENSE');

        const parsedPkgJson = await fsPromises
          .readFile(pkgJsonPath)
          .then((buf) => JSON.parse(buf.toString()));

        await Promise.all([
          // write ESM version
          fsPromises.writeFile(`${pkg.esmPath}.js`, getESMContent(parsedPkgJson, pkg)),

          // write CJS version
          fsPromises.writeFile(`${pkg.cjsPath}.js`, getCJSContent(parsedPkgJson, pkg)),

          // copy licenses
          fsPromises.copyFile(srcLicensePath, vendorLicensePath),
        ]);
      }
    }),
  );

  console.log(chalk.green('✅ Completed successfully'));
}

// run build
build().catch((error) => {
  console.error(chalk.red(error.message));
  process.exitCode = 1;
});
