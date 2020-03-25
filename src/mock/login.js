export const login = req => {
  const response = { code: 0, data: { username: JSON.parse(req.body).username, id: '5e4f867150d8619177ceb660', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNGY4NjcxNTBkODYxOTE3N2NlYjY2MCIsImlhdCI6MTU4NTE0OTQ3MH0.7Z-YZPPPJ6HfTTOAU2rHu4G4Kz-uDjWKiBC_Uzv6Jxs' }, msg: '登录成功' }
  return response
}
