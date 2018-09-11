'use strict';

const fs = require('fs');
const path = require('path');
console.log(process.cwd());
const Controller = require('egg').Controller;

const publicPath = path.join(process.cwd(), 'app/public');
const configPath = path.join(publicPath, 'config.json');

const mkdir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};
class HomeController extends Controller {
  async get() {
    const str = fs.readFileSync(configPath, 'utf-8');
    const obj = JSON.parse(str);
    console.log('config 读取成功', str, obj);
    this.ctx.body = str;
  }
  async set() {
    const { data } = this.ctx.query;
    const obj = JSON.parse(data);

    const dir = path.join(publicPath, obj.title);
    mkdir(dir);

    fs.writeFileSync(configPath, data);
    console.log('config 设置成功', data, typeof data);
    this.ctx.body = 'OK';
  }
}

module.exports = HomeController;
