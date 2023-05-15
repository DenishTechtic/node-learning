const Util = require("../Utils");
const searchUsers = require("../search");
const fs = require('fs');
const util = new Util();
const data = [
  { id: 1, name: "Denish", age: 29 },
  { id: 2, name: "Rushi", age: 23 },
  { id: 3, name: "John", age: 18 },
];

class UserController {
  static async insertUser(req, res) {
    try {
      if (!(req.body.name && req.body.age)) {
        util.setError(400, "Ok");
        return util.send(res);
      }
      let max = data.map((res) => res.id);
      const maxId = Math.max(...max);
      let newItem = {
        id: maxId + 1,
        name: req.body.name,
        age: req.body.age,
      };
      data.push(newItem);
      util.setSuccess(200, "Ok", newItem);
    } catch (error) {
      util.setError(500, error.message);
    }
    return util.send(res);
  }

  static async getUser(req, res) {
    try {
      let Id = data.find(function (item) {
        return item.id === parseInt(req.params.id);
      });
      if (Id) {
        util.setSuccess(200, "Ok", Id);
      } else {
        util.setError(400, "User Not Found");
      }
    } catch (error) {
      util.setError(500, error.message);
    }
    return util.send(res);
  }

  static async deleteUser(req, res) {
    try {
      let Id = data.find(function (item) {
        return item.id === parseInt(req.params.id);
      });
      if (Id) {
        let targetIndex = data.indexOf(Id);
        data.splice(targetIndex, 1);
        util.setSuccess(200, "Ok", Id);
      } else {
        util.setError(400, "User Not Found");
      }
    } catch (error) {
      util.setError(500, error.message);
    }
    return util.send(res);
  }

  static async updateUser(req, res) {
    try {
      let Id = data.find((item) => {
        return item.id === parseInt(req.params.id);
      });
      if (Id) {
        if (!(req.body.name && req.body.age)) {
          util.setError(400, "Please provide name and age");
          return util.send(res);
        }
        let payload = {
          id: found.id,
          name: req.body.name,
          age: req.body.age,
        };
        let targetIndex = data.indexOf(Id);
        data.splice(targetIndex, 1, payload);
        util.setSuccess(200, "Ok", payload);
      } else {
        util.setError(400, "User Not Found");
      }
    } catch (error) {
      util.setError(500, error.message);
    }
    return util.send(res);
  }

  static async userList(req, res) {
    try {
      if (req?.query?.search) {
        const query = req?.query?.search;
        const searchResults = await searchUsers(query);
        util.setSuccess(200, "Ok", searchResults);
        fs.writeFileSync('./searchdata.json', JSON.stringify(searchResults, null, 2) , 'utf-8');
      } else {
        util.setSuccess(200, "Ok", data);
        fs.writeFileSync('./data.json', JSON.stringify(data, null, 2) , 'utf-8');
      }     
    } catch (error) {
      util.setError(500, error.message);
    }
    return util.send(res);
  }
}
module.exports = UserController;
