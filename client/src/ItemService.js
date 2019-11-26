import axios from 'axios';  //axios makes http requests via javascript

const url = 'http://localhost:5000/api/items/';  

class ItemService {  //methods that will hit the routes in the items.js file, passing in the data for the post/delete routes.
 
    static getItems() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(item => ({
                        ...item,
                        createdAt: new Date(item.createdAt)
                    }))
                )
            } catch (err) {
                reject(err);
            }
        });
    }

    static insertItem(text) {
        return axios.post(url, { //! POST IS THE METHOD NOT THE DATA OBJECT
            "item": text
        });
    }
    //Delete Item

    static deleteItem(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default ItemService;