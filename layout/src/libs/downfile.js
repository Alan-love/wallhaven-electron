/*
 * @Author: 白云苍狗 
 * @Date: 2020-11-05 22:05:27 
 * @Last Modified by:   白云苍狗 
 * @Last Modified time: 2020-11-05 22:05:27 
 */


let { ipcRenderer } = __non_webpack_require__('electron');


/**
 * 下载文件
 * @param {*} obj 
 */
export const downFile = (obj) => {
    ipcRenderer.send('down-file', obj)
    /* return new Promise((resolve, reject) => {
        ipcRenderer.once(`down-file-${obj.id}`, (e, data) => resolve(data))
    }) */
}


/**
 * 更新下载状态
 * @param {*} cb 
 */
export const updateDownState = (cb) => {
    ipcRenderer.on('update-down-state', function (e, data) {
        cb(data)
    })
}

/**
 * 暂停下载
 * @param {*} url 
 */
export const pause = (url) => {
    ipcRenderer.send('down-file-pause', { url })
}

/**
 * 取消下载
 * @param {*} url 
 */
export const cancel = (url) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send('down-file-cancel', { url })
        ipcRenderer.once(`down-file-cancel-${url}`, (e, data) => resolve(data))
    })
}

/**
 * 恢复下载
 * @param {*} url 
 */
export const resume = (url) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send('down-file-resume', { url })
        ipcRenderer.once(`down-file-resume-${url}`, (e, data) => resolve(data))
    })
}

/**
 * 断点续下载
 * @param {*} obj 
 */
export const nextresume = (obj) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send('resume-download', obj)
        ipcRenderer.once(`resume-download-${obj.id}`, (e, data) => resolve(data))
    })
}


/**
 * 初始化下载地址
 * @param {*} path 下载路径
 */
export const initPath = () => {
    let path = localStorage.getItem('downloads') || 'not';
    ipcRenderer.send('set_path', { path })
    ipcRenderer.once(`set_path`, (e, data) => {
        localStorage.setItem('downloads', data)
    })
}