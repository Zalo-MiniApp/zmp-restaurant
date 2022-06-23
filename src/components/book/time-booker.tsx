import { FunctionComponent, useMemo, useRef } from "react";
import { Box, Button, Swiper, SwiperSlide, Title } from "zmp-framework/react";
import { Hours } from "../../models";
import Time from "../format/time";

interface TimeBookerProps {
  value: Hours
  onChange: (value: Hours) => void
  hours: {
    opening: Hours,
    closing: Hours,
  },
}

const TimeBooker: FunctionComponent<TimeBookerProps> = ({ value, onChange, hours }) => {
  const swiperRef = useRef<any>()
  const availableHours = useMemo(() => {
    const res: Hours[] = [];
    let hour = hours.opening[0];
    let minute = hours.opening[1];
    while (hour < hours.closing[0] || (hour === hours.closing[0] && minute < hours.closing[1])) {
      res.push([hour < 13 ? hour : hour - 12, minute, hour < 13 ? 'AM' : 'PM']);
      if (minute < 30) {
        minute = 30;
      } else {
        minute = 0;
        hour++;
      }
    }
    res.push([hours.closing[0], hours.closing[1], hours.closing[2]]);

    return res;
  }, [hours])

  const slideTo = (index: number) => {
    swiperRef.current.el.swiper.slideTo(index);
  }

  return <Box m="0">
    <Title size="small" className="mx-2">Thời gian khả dụng</Title>
    <Swiper ref={swiperRef} className="date-booker" slidesPerView={3} centeredSlides>
      {availableHours.map((hour, i) => <SwiperSlide>
        <div onClick={() => slideTo(i)} className="flex rounded-full bg-white h-12 items-center justify-center py-3 mx-2 whitespace-nowrap"><Time time={hour} /></div>
      </SwiperSlide>)}
    </Swiper>
  </Box>;
}

export default TimeBooker;