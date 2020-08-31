export default class API {
  /**
     * @param {string} path;
     * @param {RequestInit} payload
    */
  static async request (path, payload = {}) {
    const devUrl = 'http://localhost:3000'
    const prodUrl = 'http://localhost:3000' // modify as your wish
    const rootUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl
    const res = await fetch(`${rootUrl}/api${path}`, payload)
    const data = await res.json()
    return { status: res.status, ...data }
  }

  /**
   *
   * @param {string} articleId
   * @param {object} comment
   */
  static async comment (articleId, comment) {
    const devUrl = 'http://localhost:3000'
    const prodUrl = 'http://localhost:3000' // modify as your wish
    const rootUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl
    const res = await fetch(`${rootUrl}/api/articles/${articleId}`, {
      method: 'POST',
      body: JSON.stringify(comment)
    })
    return res
  }
}
