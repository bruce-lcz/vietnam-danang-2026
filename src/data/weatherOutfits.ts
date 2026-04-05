export type WeatherOutfitCard = {
    day: number;
    tripDate: string;
    date: string;
    weekday: string;
    area: string;
    liveLocationKeys: ("da-nang" | "hoi-an")[];
    condition: string;
    temperature: string;
    rain: string;
    vibe: "sunny" | "mixed" | "rainy" | "mountain";
    outfit: string;
    note: string;
};

export const weatherOutfitOverview = {
    eyebrow: "4 月穿搭提醒",
    summary:
        "4/17 到 4/22 目前看起來會是白天炎熱、紫外線強，峴港市區白天大多落在 34 到 35°C 左右，其中巴拿山會比市區明顯偏涼。",
    essentials: ["帽子/墨鏡", "防曬外套", "折疊傘", "好走鞋", "薄外套"],
};

const weatherOutfits: WeatherOutfitCard[] = [
    {
        day: 1,
        tripDate: "2026-04-17",
        date: "04/17",
        weekday: "Fri",
        area: "峴港機場・會安古城",
        liveLocationKeys: ["da-nang", "hoi-an"],
        condition: "偏熱，白天日曬感明顯",
        temperature: "約 24-34°C",
        rain: "以晴熱感為主",
        vibe: "mixed",
        outfit: "短袖上衣＋透氣長裙/寬褲＋好走涼鞋，晚上逛古城可帶一件薄襯衫。",
        note: "白天大量步行拍照，選輕薄不貼身材質會舒服很多。",
    },
    {
        day: 2,
        tripDate: "2026-04-18",
        date: "04/18",
        weekday: "Sat",
        area: "會安・迦南島・峴港市區",
        liveLocationKeys: ["hoi-an", "da-nang"],
        condition: "晴熱，水上活動曝曬感強",
        temperature: "約 24-34°C",
        rain: "整體偏乾熱",
        vibe: "sunny",
        outfit: "背心或短袖快乾衣＋短褲/防潑水下身，竹籃船建議戴帽子、墨鏡，包包準備防水袋。",
        note: "這天有水椰林與市場行程，防曬和能快乾比穿搭層次更重要。",
    },
    {
        day: 3,
        tripDate: "2026-04-19",
        date: "04/19",
        weekday: "Sun",
        area: "五行山・山茶半島・峴港",
        liveLocationKeys: ["da-nang"],
        condition: "偏熱，戶外走動會有曝曬感",
        temperature: "約 24-34°C",
        rain: "留意天氣變化即可",
        vibe: "mixed",
        outfit: "排汗短袖＋輕薄長褲＋防滑運動鞋，包包放折疊傘或輕便雨衣。",
        note: "五行山和靈應寺都要走階梯，鞋底抓地力會比好看更重要。",
    },
    {
        day: 4,
        tripDate: "2026-04-20",
        date: "04/20",
        weekday: "Mon",
        area: "巴拿山・晚間回峴港",
        liveLocationKeys: [],
        condition: "市區炎熱，山上體感明顯較涼",
        temperature: "山上約 18-24°C / 市區約 25-35°C",
        rain: "山上風大時可加件薄外套",
        vibe: "mountain",
        outfit: "短袖打底＋薄外套/針織罩衫＋長褲＋包腳鞋，早晚和纜車上比較舒適。",
        note: "這天溫差最大，最推薦洋蔥式穿法，山上拍照也比較不會冷到縮起來。",
    },
    {
        day: 5,
        tripDate: "2026-04-21",
        date: "04/21",
        weekday: "Tue",
        area: "美山聖地・美溪沙灘",
        liveLocationKeys: ["da-nang"],
        condition: "炎熱，古蹟區與海邊都偏曬",
        temperature: "約 24-34°C",
        rain: "白天以悶熱曝曬為主",
        vibe: "mixed",
        outfit: "無袖或短袖涼感上衣＋輕薄長裙/短褲，另備泳衣、拖鞋與替換衣物。",
        note: "上午古蹟很曬，下午海邊又會想下水，建議直接把海灘裝一起帶著。",
    },
    {
        day: 6,
        tripDate: "2026-04-22",
        date: "04/22",
        weekday: "Wed",
        area: "峴港市區・機場返台",
        liveLocationKeys: ["da-nang"],
        condition: "偏熱，白天行動仍會流汗",
        temperature: "約 24-35°C",
        rain: "以晴熱感為主",
        vibe: "sunny",
        outfit: "寬鬆短袖＋舒適長褲＋方便安檢穿脫的鞋款，機上怕冷可帶薄外套。",
        note: "返程日以舒服、好整理行李為主，長途飛行建議避免太緊的褲型。",
    },
];

export const weatherSources = [
    {
        label: "QWeather · Da Nang 30-Day Forecast",
        url: "https://www.qweather.com/weather30d/da-nang-80E22.html",
    },
    {
        label: "Open-Meteo · 10-Day Forecast API",
        url: "https://open-meteo.com/en/docs",
    },
];

export default weatherOutfits;
