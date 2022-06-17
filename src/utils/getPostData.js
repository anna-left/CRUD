function getPostData(request) {
  return new Promise((resolve, reject) => {
    try {
      let requestBody = ''

      request.on('data', (chunk) => {
        requestBody += chunk.toString()
      })

      request.on('end', () => {
        resolve(requestBody)
      })
    } catch (error) {
      reject(error)
    }
  })
}

export { getPostData };
