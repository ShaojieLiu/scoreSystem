'use strict';

const fs = require('fs');
const path = require('path');
console.log(process.cwd());
const Controller = require('egg').Controller;

const configPath = path.join(process.cwd(), 'app/public/config.json');

class HomeController extends Controller {
  async get() {
    const str = fs.readFileSync(configPath, 'utf-8');
    const obj = JSON.parse(str);
    console.log('config 读取成功', str, obj);
    this.ctx.body = str;
  }
  async set() {
    const { data } = this.ctx.query;
    const str = JSON.stringify(data);
    fs.writeFileSync(configPath, str);
    console.log('config 设置成功', str);
    this.ctx.body = 'OK';
  }
}

module.exports = HomeController;
