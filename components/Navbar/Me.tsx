import React from "react";
import type { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Icon,
  Avatar,
  Box,
  Center,
} from "@chakra-ui/react";
import Lorem from "../Lorem";
function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export default function Me() {
  const auth = useSelector((state: RootState) => state.auth);

  if (isEmpty(auth)) {
    return (
      <Link href="/login">
        <Button mx="20px" colorScheme="yellow" variant="link" color="primary">
          <Icon as={BiLogIn} fontSize={23} />
        </Button>
      </Link>
    );
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Button mx="20px" colorScheme="yellow" variant="link" color="primary">
          <Avatar size="sm" name={auth.displayName} src={auth.photoURL} />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="260px" h="150px" shadow="md">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          반가워요.
          <br /> {auth.displayName}
        </PopoverHeader>
        <Center flexDir="row">
          <Link href="/logout">
            <Button mx="20px" colorScheme="yellow" variant="link" color="primary">
              <Icon as={BiLogOut} fontSize={23} mr="10px" /> Logout
            </Button>
          </Link>
        </Center>
      </PopoverContent>
    </Popover>
  );
}
