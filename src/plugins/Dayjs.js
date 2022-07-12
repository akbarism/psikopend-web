import Vue from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);

Object.defineProperties(Vue.prototype, {
  $date: {  
    get() {
      return dayjs;
    },
  },
});
