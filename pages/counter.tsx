import { Button, Center, Stack } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { increment, decrement, incrementByAmount } from "store/counterSlice";

export default function Counter() {
  const counter = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  function _increment() {
    console.log(counter, "before_increment");
    dispatch(increment());
    console.log(counter, "after_increment");
  }

  function _decrement() {
    dispatch(decrement());
  }
  return (
    <Stack as={Center} w="100%">
      <>
        <Button onClick={_increment}>+</Button>
        {counter}
        <Button onClick={_decrement}>-</Button>
      </>
    </Stack>
  );
}
