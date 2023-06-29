import {api} from "../boot/axios"

class UserService{
  login(data) {
    return api.post(`/login`, data)
  }
  createUser(data) {
    return api.post(`/users/add`, data)
  }
  updateUser(data) {
    return api.put(`/users/update/${data.id}`, data)
  }
  getUsers() {
    return api.get('/users/all')
  }
  getUserById(id) {
    return api.get('/users/'+parseInt(id))
  }
  deleteUser(id) {
    return api.delete('/users/delete/'+parseInt(id))
  }
}

export default new UserService
