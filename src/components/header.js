import React from 'react';
import { Header, Title, Left, Right, Body, Icon, Button } from 'native-base';

const header = (props) => {
  return (
    <Header>
      <Left>
        <Button transparent onPress={props.leftPress}>
          <Icon name={props.left} />
        </Button>
      </Left>
      <Body>
      <Title>{props.title}</Title>
      </Body>
      <Right>
        {props.right && <Button transparent onPress={props.rightPress}>
          <Icon name={props.right} />
        </Button>}
      </Right>
    </Header>
  );
};

export default header;
