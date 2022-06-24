import { useMemo } from "react";
import { Box, Link, Title } from "zmp-framework/react";
import { useCurrentRoute, useRestaurant } from "../hooks";

function Header() {
  const [currentRoute] = useCurrentRoute();

  const restaurant = useRestaurant(Number(currentRoute.query?.id));

  const title = useMemo(() => {
    if (currentRoute.path === '/restaurant/') {
      if (restaurant) {
        return restaurant.name
      }
    }
    return 'Nhà hàng Jolliboo'
  }, [currentRoute])

  return <Box className="header">
    <Title className="flex items-center">
      {currentRoute.path !== '/' && <Link iconZMP="zi-arrow-left" className="pl-2 pr-4" back />}
      {title}
    </Title>
  </Box>;
}

export default Header;