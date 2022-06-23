import { useEffect, useRef, useState } from "react";
import { Box, Button, Sheet, Text, Title, useStore, zmp } from "zmp-framework/react";
import { Cart } from "../../models";
import Notch from "../menu/notch";
import Price from "../format/price";

function CartDetail() {
  const cart = useStore('cart') as Cart;
  const edit = (i: number) => {
    zmp.views.main.router.navigate({
      path: '/food-picker/',
      query: {
        cartItemIndex: i
      }
    })
  }

  return <Box pt="1">
    {cart.items.map((item, i) => <Box flex justifyContent="space-between">
      <Box flex>
        <Button className="w-10" fill>{item.quantity}x</Button>
        <div className="ml-6">
          <Title size="small">{item.food.name}</Title>
          {item.food.extras.map(extra => <Text>{extra.label} {extra.options.find(o => o.selected)?.label}</Text>)}
        </div>
      </Box>
      <Box flex flexDirection="column" alignItems="flex-end" justifyContent="space-between">
        <Text className="mr-2 ml-2 text-orange-500 mb-0" bold><Price amount={item.food.price * item.quantity} /></Text>
        <Button onClick={() => edit(i)}>Thay đổi</Button>
      </Box>
    </Box>)}
  </Box>;
}

function CartPreview() {
  const cart = useStore('cart') as Cart;
  const total = useStore('total') as number;
  const [expaned, setExpanded] = useState(false);

  const sheetRef = useRef<any>();

  const nextStep = () => {
    sheetRef.current.zmpSheet().stepOpen();
    setExpanded(true);
  }

  useEffect(() => {
    document.querySelector('.sheet-backdrop')?.classList[expaned ? 'add' : 'remove']('backdrop-in');
  }, [expaned])

  return <Sheet
    ref={sheetRef}
    opened={cart.items.length > 0}
    closeByBackdropClick={false}
    className="h-min border-t"
    swipeToStep
    onSheetStepOpen={() => setExpanded(true)}
    onSheetStepClose={() => setExpanded(false)}
  >
    <Notch color="#637875" />
    <Box p="1"></Box>
    <div className={`sheet-modal-swipe-step ${expaned ? 'pb-4' : 'pb-6'}`}>
      {expaned && <>
        <Box p="4" flex justifyContent="center">Pizza</Box>
        <hr />
        <Title size="small" className="mx-6 my-4">Chi tiết</Title>
        <hr />
        <CartDetail />
        <hr />
      </>}
      <Box m="0" px="6" mt="6" flex justifyContent="space-between">
        <Title bold size="small">Tổng cộng ({cart.items.length} món)</Title>
        <Text className="ml-6 text-orange-500 mb-0" size="xlarge" bold><Price amount={total} /></Text>
      </Box>
      <Box m="0" px="6" pt="6">
        <Button large fill responsive className="rounded-xl" onClick={expaned ? () => { } : nextStep}>
          {expaned ? <span>Đặt bàn với thực đơn</span> : <span>Tiếp theo</span>}
        </Button>
      </Box>
    </div>
    <Box m="0" px="6" pb="6">
      <Button large fill responsive className="rounded-xl" typeName="secondary">Chỉ đặt món ăn</Button>
    </Box>
  </Sheet>;
}

export default CartPreview;