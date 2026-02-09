# ReactClass Week6 專案

這是一個基於 Vite + React 的專案，練習使用 React Hook Form 進行表單驗證、購物車流程、以及部分 API 串接與 loading 顯示。

主要功能
- 產品列表與單一產品頁：可檢視商品、調整數量並加入購物車（有 loading 動畫）
- 購物車：查看、編輯數量、刪除產品、送出訂單（送出後清空購物車）
- 前台結帳表單驗證：使用 React Hook Form 驗證姓名、Email、電話、地址等欄位
- 後端登入示範頁面（含表單驗證）

技術棧
- React 19
- Vite（開發伺服器與建置）
- React Router
- React Hook Form（表單驗證）
- axios（API 請求）
- react-loader-spinner（loading 動畫）
- bootstrap（樣式）

專案目錄概覽

```
src/
    App.jsx                # React App 入口
    main.jsx               # Vite 入口（掛載 React）
    assets/                # CSS 與靜態資源
        all.css
        style.css
    components/
        SingleProductModal.jsx  # 單一產品詳細 modal
    routes/
        index.jsx            # 路由設定
    views/
        Home.jsx             # 首頁
        Products.jsx         # 產品列表頁
        Product.jsx          # 單一產品頁
        Cart.jsx             # 購物車頁面
        Login.jsx            # 登入頁面（表單驗證示範）
        About.jsx
        NotFound.jsx
```

重要實作與注意事項
- 當使用者新增相同產品至購物車時，會將數量累加（而非新增重複項目）
- 送出訂單後會清空購物車內容
- 表單驗證重點（已實作）:
    - 登入：email、password 必填（email 欄位為 email 類型）
    - 結帳表單：姓名（必填）、Email（必填且格式正確）、電話（必填且長度要求）、地址（必填）、留言（非必填）

測試與自評
- 本專案為教學練習範例，實作等級自評為 LV2：已完成表單驗證與前台購物流程 API 的串接。

建議的後續改進
- 新增整體樣式與 RWD 優化
- 增加錯誤處理的 UI（如全域通知、錯誤攔截）
- 加入單元測試（React Testing Library / Vitest）
- 將購物車狀態改為使用 Context 或狀態管理套件以利跨頁共用