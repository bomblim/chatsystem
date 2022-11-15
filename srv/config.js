
import fs from 'fs';
import ini from 'ini';

const config = ini.parse(fs.readFileSync('./srv/config.ini', 'utf-8'));


export default config;