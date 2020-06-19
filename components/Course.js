import React from "react";
import styled from "styled-components";
import { Dimension, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

function getCourseWidth(screenWidth) {
  var cardWidth = screenWidth - 40;
  if (screenWidth >= 768) {
    cardWidth = (screenWidth - 60) / 2;
  }
  if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 80) / 3;
  }
  return cardWidth;
}
class Course extends React.Component {
  state = {
    cardWidth: getCourseWidth(screenWidth),
  };
  componentDidMount() {
    Dimensions.addEventListener("change", this.adaptLayout);
  }
  adaptLayout = (dimension) => {
    this.setState({
      cardWidth: getCourseWidth(dimension.window.width),
    });
  };
  render() {
    return (
      <Container style={{ width: this.state.cardWidth }}>
        <Cover>
          <Image source={this.props.image} resizeMode="contain" />
          <Subtitle>{this.props.subtitle} </Subtitle>
          <Title>{this.props.title} </Title>
        </Cover>
        <Content>
          <Avatar source={this.props.avatar} />
          <Caption>{this.props.caption} </Caption>
          <Author>{this.props.author} </Author>
        </Content>
      </Container>
    );
  }
}

export default Course;

const Container = styled.View`
width:315px;
height:335px;
background:white;
margin: 10px 10px;
border-radius: 14px;
box-shadow 0 10px 20px rgba(0,0,0,0.15)
`;
const Cover = styled.View`
  height: 260px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
const Subtitle = styled.Text`
font-size:15px;
font-weight:500;
color: rgba(255,255,255,0.8)
text-transform:uppercase;
margin-left:20;
`;
const Title = styled.Text`
  font-size: 24;
  color: white;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 20px;
  margin-left: 20px;
  width: 170px;
`;
const Content = styled.View`
  padding-left: 62px;
  justify-content: center;
  height: 75;
`;
const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 16px;
`;
const Caption = styled.Text`
  font-size: 14px;
  color: #3c4560;
  font-weight: 500;
`;
const Author = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight: 500;
  margin-top: 4px;
`;
