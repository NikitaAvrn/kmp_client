export default {
  arrayCardTransform(source, colCount) {
    const length = Math.ceil(source.length / colCount)
    let arr = new Array()
    let inx = 0
    for (let i = 0; i < length; i++) {
      arr[i] = new Array()
      arr[i] = source.slice(inx, inx + colCount)
      inx += colCount
    }
    return arr
  },
}
