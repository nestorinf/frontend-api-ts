import {api} from "../boot/axios"


class MenuService{

  getMenu() {
    return api.get(`/menus/all`)
  }

  getMenuByUser(email) {
    return api.get('/menus/user', {params:{email:email}})
  }
}

export default new MenuService
