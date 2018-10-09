'use strict';

const fs = require('fs');
const path = require('path');
console.log(process.cwd());
const Controller = require('egg').Controller;

const publicPath = path.join(process.cwd(), 'app/public');
const configPath = path.join(publicPath, 'config.json');

class HomeController extends Controller {
  async get() {
    const { data } = this.ctx.query;
    const obj = JSON.parse(data);
    const names = obj.name;
    const result = names.map(n => {
      const scorePath = path.join(publicPath, obj.title, `${n}.json`);
      const exist = fs.existsSync(scorePath);
      if (exist) {
        const str = fs.readFileSync(scorePath, 'utf-8');
        return JSON.parse(str);
      }
      return { self: n, score: {} };
    });
    console.log('score 读取成功', result);
    this.ctx.body = result;
  }

  async set() {
    const { data } = this.ctx.query;
    const obj = JSON.parse(data);
    console.log('score 设置成功', obj, typeof obj);
    const scorePath = path.join(publicPath, obj.title, `${obj.self}.json`);
    fs.writeFileSync(scorePath, data);
    this.ctx.body = 'OK';
  }
}

module.exports = HomeController;
