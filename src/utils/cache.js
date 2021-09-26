// 历史记录的字段
const HISTORY_KEY = '__history__'
// 历史记录的最大长度
const HISTORY_MAX_LENGTH = 50

const SEARCH_KEY = '__search__'
// 搜索保存的最大历史记录
const SEARCH_MAX = 20

// 插入数组的方法
function insertArray(array, val, compare, maxLen) {
    // 获取数组下标
    const index = array.findIndex(compare)
    if (index === 0) {
        return
    }
    if (index > 0) {
        array.splice(index, 1)
    }
    array.unshift(val)
    if (maxLen && array.length > maxLen) {
        // 删除最后一个元素，并且返回行的数组长度
        array.pop()
    }
}

// 删除历史记录
function deleteFromArray(array, compare) {
    const index = array.findIndex(compare)
    if (index > -1) {
        array.splice(index, 1)
    }
}
// 添加最近播放列表
export function saveHistory(song) {
    let songs = uni.getStorageSync(HISTORY_KEY, [])
    insertArray(songs, song, (item) => {
        return song.id === item.id
    }, HISTORY_MAX_LENGTH)
    uni.setStorageSync(HISTORY_KEY, songs)
    return songs
}

// 删除最近播放历史记录
export function deleteHistory(song) {
    let songs = uni.getStorageSync(HISTORY_KEY, [])
    deleteFromArray(songs, (item) => {
        return song.id === item.id
    })
	uni.setStorageSync(HISTORY_KEY, songs)
    return songs
}

// 全部清除最近播放列表
export function clearHistory() {
    uni.removeStorageSync(HISTORY_KEY)
    return []
}

// 存储历史搜索数据
export function saveSearch(query) {
    let searches = uni.getStorageSync(SEARCH_KEY, [])
    insertArray(searches, query, item => {
        return item === query
    }, SEARCH_MAX)
    uni.setStorageSync(SEARCH_KEY, searches)
    return searches
}

// 读取搜索历史记录
export function getSearch() {
    return uni.getStorageSync(SEARCH_KEY, [])
}

// 删除单个搜索历史记录
export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    deleteFromArray(searches, item => {
        return item === query
    })
    uni.setStorageSync(SEARCH_KEY, searches)
    return searches
}

// 清除所有搜索历史记录
export function clearSearch() {
    uni.removeStorageSync(SEARCH_KEY)
    return []
}