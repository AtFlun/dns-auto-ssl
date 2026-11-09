/**
 * 共享模块,导出在多个文件中使用的常用函数和模块
 * >查看定义:@see {@link execPromise}、{@link dnsAutoSslDir}、{@link acmeDirectory}、{@link getDirname}、
 * {@link isWindows}、{@link dnsAutoSslHome}、{@link getRenewStampPath}、{@link tmpDir}
 */
import { exec, spawn } from 'child_process';
import fs from 'fs';
import { homedir, platform, tmpdir } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

/**
 * ACME 服务器的目录 URL
 * >查看定义:@see {@link acmeDirectory}
 * @type {string}
 */
const acmeDirectory = 'https://acme-staging-v02.api.letsencrypt.org/directory';

/**
 * 证书配置默认目录(用户主目录下 .dns-auto-ssl 目录中,包含自动续期相关的文件和目录)
 * >查看定义:@see {@link dnsAutoSslDir}
 * @type {string}
 */
const dnsAutoSslDir = '.dns-auto-ssl';

/**
 * 获取 dns-auto-ssl 的主目录路径
 * >查看定义:@see {@link dnsAutoSslHome}
 * @type {string}
 */
const dnsAutoSslHome = path.join(homedir(), dnsAutoSslDir);

/**
 * 判断当前平台是否为 Windows
 * >查看定义:@see {@link isWindows}
 * @type {boolean}
 */
const isWindows = platform() === 'win32';

/**
 * 获取系统临时目录路径
 * >查看定义:@see {@link tmpDir}
 * @type {string}
 */
const tmpDir = tmpdir();

/**
 * 将 child_process.exec 包装成 Promise
 * >查看定义:@see {@link execPromise}
 * @type {function(string, Object): Promise<{ stdout: string, stderr: string }>}
 */
const execPromise = (cmd, opts = {}) => promisify(exec)(cmd, { windowsHide: true, ...opts });

/**
 * 获取当前模块所在目录的路径(类似 CommonJS 的 __dirname)
 * >查看定义:@see {@link getDirname}
 * @param {string} metaUrl - 传入 `import.meta.url`
 * @returns {string} 当前模块的目录路径
 */
const getDirname = metaUrl => path.dirname(fileURLToPath(metaUrl));

/**
 * 获取续期标志文件路径
 * >查看定义:@see {@link getRenewStampPath}
 * @param {string} mainDomain - 主域名
 * @returns {string} 续期标志文件的路径
 */
const getRenewStampPath = mainDomain => path.join(dnsAutoSslHome, `.${mainDomain}.renew-stamp`);

export {
    fs, path, platform, spawn, acmeDirectory, dnsAutoSslDir, dnsAutoSslHome, isWindows, tmpDir,
    execPromise, getDirname, getRenewStampPath
};