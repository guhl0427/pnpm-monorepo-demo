# pnpm-monorepo-demo

## 创建pnpm.workspace.yaml

```yaml
packages:
  - 'packages/*'
```

## 创建packages目录

分别创建`core` `components` `utils`目录，为每个目录新增`package.json`

## 为packages安装依赖
--filter(-F)

```
 pnpm -F @packages/components add lodash

 pnpm --filter @packages/utils add dayjs
```

## 全局安装依赖
-w 报错了`--workspace-root may only be used inside a workspace`，不加这个参数反而可以

```
pnpm add rollup -D

pnpm add typescript -D

pnpm add vue
```