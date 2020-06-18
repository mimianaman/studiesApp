import React from "react";
import styled from "styled-components";
import { Button } from "react-native";

const CoursesScreen = (props) => {
  return (
    <Container>
      <Text> welcome to courses screen </Text>
    </Container>
  );
};

export default CoursesScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
