import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Swiper, SwiperSlide, Text, Title } from "zmp-framework/react";

interface DateBookerProps {
  onChange: (date: Date) => void;
}

const DateBooker: FunctionComponent<DateBookerProps> = () => {
  const swiperRef = useRef<any>();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const datesOfMonth = useMemo(() => {
    const dates: Date[] = [];
    let date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      dates.push(date);
      date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    }
    return dates;
  }, [month, year]);

  const getDayName = (date: Date) => ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'][date.getDay()];
  const next = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  const slideToDay = (day: number) => {
    swiperRef.current.el.swiper.slideTo(day - 1);
  }

  useEffect(() => {
    slideToDay(new Date().getDate());
  }, [])

  return <>
    <Box flex alignItems="center">
      <Title size="small" className="mb-0">Tháng {month + 1} {year}</Title>
      <Button onClick={prev} className="w-8 ml-4" typeName="secondary" iconZMP="zi-chevron-left" small></Button>
      <Button onClick={next} className="w-8 ml-4" typeName="secondary" iconZMP="zi-chevron-right" small></Button>
    </Box>
    <Swiper ref={swiperRef} className="date-booker" slidesPerView={5} centeredSlides>
      {datesOfMonth.map((date) => <SwiperSlide>
        <div onClick={() => slideToDay(date.getDate())} className="bg-white rounded-full h-20 flex flex-col items-center justify-center w-12 m-auto">
          <span className="whitespace-nowrap mt-2 mb-1 text-xs">{getDayName(date)}</span>
          <Title size="large">{date.getDate()}</Title>
        </div>
      </SwiperSlide>)}
    </Swiper>
  </>;
}

export default DateBooker;