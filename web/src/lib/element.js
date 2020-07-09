export const pickerOptions = {
  shortcuts: [
    {
      text: "最近一周",
      start: new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
    },
    {
      text: "最近一个月",
      start: new Date(new Date().getTime() - 3600 * 1000 * 24 * 30)
    },
    {
      text: "最近三个月",
      start: new Date(new Date().getTime() - 3600 * 1000 * 24 * 90)
    },
    {
      text: "最近六个月",
      start: new Date(new Date().getTime() - 3600 * 1000 * 24 * 180)
    },
    {
      text: "最近一年",
      start: new Date(new Date().getTime() - 3600 * 1000 * 24 * 365)
    },
    {
      text: "一年以上",
      start: new Date(1970, 1, 1),
      end: new Date(new Date().getTime() - 3600 * 1000 * 24 * 365)
    }
  ].map(item => ({
    text: item.text,
    onClick(picker) {
      picker.$emit("pick", [
        item.start,
        item["end"] ? item["end"] : new Date()
      ]);
    }
  }))
};
