export default {
    getHomeData:()=>{
        return {
          code: 200,
          data: {
            tableData: [
              {
                name: "oppo",
                todayBuy: 500,
                monthBuy: 4000,
                totalBuy: 22000,
              },
              {
                name: "小米",
                todayBuy: 1200,
                monthBuy: 6500,
                totalBuy: 45900,
              },
              {
                name: "华为",
                todayBuy: 1800,
                monthBuy: 6500,
                totalBuy: 78900,
              },
              {
                name: "苹果",
                todayBuy: 800,
                monthBuy: 4500,
                totalBuy: 65000,
              },
              {
                name: "一加",
                todayBuy: 880,
                monthBuy: 7500,
                totalBuy: 99900,
              },
              {
                name: "三星",
                todayBuy: 750,
                monthBuy: 7500,
                totalBuy: 59600,
              },
            ],
          },
        };
    }
}