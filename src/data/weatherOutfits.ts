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
        "4/17 到 4/22 綜合兩個天氣來源來看，峴港與會安白天多在 31 到 33°C、夜晚約 23 到 25°C，整體是熱、曬、偶爾多雲。4/17、4/18 有局部雷雨訊號，4/22 也可能有短暫陣雨，所以雨具當備案放包包即可；4/20 巴拿山約 14 到 25°C，薄外套仍然必帶。",
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
        condition: "晴到多雲，抵達後偏熱偏曬",
        temperature: "峴港約 25-32°C / 會安約 25-33°C",
        rain: "主流預報偏乾，另一來源有局部雷雨訊號",
        vibe: "mixed",
        outfit: "短袖上衣＋透氣長裙/寬褲＋好走涼鞋，晚上逛古城可帶一件薄襯衫。",
        note: "這天不要當成整天雨天；主要還是熱和曬，包包放折疊傘，鞋子選淋到短暫陣雨也不心疼的款式。",
    },
    {
        day: 2,
        tripDate: "2026-04-18",
        date: "04/18",
        weekday: "Sat",
        area: "會安・迦南島・峴港市區",
        liveLocationKeys: ["hoi-an", "da-nang"],
        condition: "大致多雲但悶熱，水上活動仍會曬",
        temperature: "會安約 24-31°C / 峴港約 24-32°C",
        rain: "降雨機率不高，但午後局部雷雨仍可留意",
        vibe: "mixed",
        outfit: "背心或短袖快乾衣＋短褲/防潑水下身，竹籃船建議戴帽子、墨鏡，包包準備防水袋。",
        note: "這天有水椰林與移動行程，快乾、防潑水和可收納雨具會比穿搭層次更重要；防曬一樣不能省。",
    },
    {
        day: 3,
        tripDate: "2026-04-19",
        date: "04/19",
        weekday: "Sun",
        area: "五行山・山茶半島・峴港",
        liveLocationKeys: ["da-nang"],
        condition: "局部晴朗到多雲，戶外走動偏熱",
        temperature: "約 23-32°C",
        rain: "兩個來源都偏乾，防曬比防雨更重要",
        vibe: "mixed",
        outfit: "排汗短袖＋輕薄長褲＋防滑運動鞋，包包放折疊傘或輕便雨衣。",
        note: "五行山和靈應寺都要走階梯，這天重點是防曬、補水和鞋底抓地力。",
    },
    {
        day: 4,
        tripDate: "2026-04-20",
        date: "04/20",
        weekday: "Mon",
        area: "巴拿山・晚間回峴港",
        liveLocationKeys: [],
        condition: "峴港市區大致多雲，山上日夜溫差大",
        temperature: "巴拿山約 14-25°C / 峴港約 24-31°C",
        rain: "市區降雨機率低，山區天氣變化較快，雨具仍建議帶",
        vibe: "mountain",
        outfit: "短袖打底＋薄外套/針織罩衫＋長褲＋包腳鞋，早晚和纜車上比較舒適。",
        note: "這天溫差最大，市區像夏天、山上像涼爽山區；纜車、陰影處和風大的地方會冷得很明顯。",
    },
    {
        day: 5,
        tripDate: "2026-04-21",
        date: "04/21",
        weekday: "Tue",
        area: "美山聖地・美溪沙灘",
        liveLocationKeys: ["da-nang"],
        condition: "局部晴朗到多雲，古蹟區與海邊都偏曬",
        temperature: "峴港約 24-32°C / 美山約 23-34°C",
        rain: "整體偏乾，午後仍可留意雲量變化",
        vibe: "mixed",
        outfit: "無袖或短袖涼感上衣＋輕薄長裙/短褲，另備泳衣、拖鞋與替換衣物。",
        note: "上午古蹟區沒有太多遮蔭，下午海邊又會想下水，建議直接把海灘裝一起帶著。",
    },
    {
        day: 6,
        tripDate: "2026-04-22",
        date: "04/22",
        weekday: "Wed",
        area: "峴港市區・機場返台",
        liveLocationKeys: ["da-nang"],
        condition: "局部晴朗偏熱，會安端有降雨訊號",
        temperature: "峴港約 25-33°C / 會安約 25-33°C",
        rain: "峴港偏乾，會安端有較明顯降雨訊號",
        vibe: "mixed",
        outfit: "寬鬆短袖＋舒適長褲＋方便安檢穿脫的鞋款，機上怕冷可帶薄外套。",
        note: "返程日以舒服、好整理行李為主；雨具放行李外層，但不要為了雨犧牲透氣度。",
    },
];

export const weatherSources = [
    {
        label: "QWeather · Da Nang 30-Day Forecast",
        url: "https://www.qweather.com/weather30d/da-nang-80E22.html",
    },
    {
        label: "峴港 10 日預報（主基準）",
        url: "https://www.accuweather.com/zh/vn/da-nang/352954/weather-forecast/352954",
    },
    {
        label: "開放天氣 API（局部雨備援）",
        url: "https://open-meteo.com/en/docs",
    },
];

export default weatherOutfits;
