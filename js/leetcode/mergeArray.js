function merge( nums1, m, nums2, n ) {
    let i = m - 1
    let j = n - 1
    let len = m + n - 1
    while (i >= 0 && j >= 0) {
        nums1[len--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--]
    }
    // 如果nums2先达到j = -1, 则nums1.splice(0, 0)是无效的
    nums1.splice(0, j + 1, ...nums2.slice(0, j + 1))
    return nums1
}

const c = [2, 3, 5, 7, 9]
const d = [3, 4, 6, 8]

console.log(merge(c, 5, d, 4))