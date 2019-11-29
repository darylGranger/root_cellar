import axios from 'axios';  //axios makes http requests via javascript

const url = 'api/items/';  

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

    static insertItem(item) {
        return axios.post(url, { //! POST IS THE METHOD NOT THE DATA OBJECT
            description: item.description,
            quantity : item.quantity
        });
    }
    //Delete Item

    static deleteItem(id) {
        return axios.delete(`${url}${id}`);
    }

    static editItem() {
        //nothing to see here
    }
}

export default ItemService;