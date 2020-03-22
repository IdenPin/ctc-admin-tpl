# vue-ele-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### generate page or component 
```
npm run new:comp
npm run new:view
```



### element ui 主题深度定制
1. npm i element-theme -D 
2. npm i element-theme-chalk -D
通过 `et -h` 查看帮助

```
// 初始化主题 variables
et -i src/assets/style/element-variables.scss
// 实时编译监测
et -c src/assets/style/element-variables.scss -o src/assets/style/theme/ -m --watch
```