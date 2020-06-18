import React from "react";
import styled from "styled-components";

const ClassCategorie = (props) => (
  <Container>
    <Text>{props.text} </Text>
  </Container>
);

export default ClassCategorie;

const Container = styled.View`
  flex-direction: row;
  background: white;
  height: 60px;
  padding: 12px 16px 12px;
  border-radius:10px;
  box-shadow : 0 5px 10px rgba(0,0,0,0.05)
  align-items:center;
  margin:0 8px
`;
const Text = styled.Text``;
