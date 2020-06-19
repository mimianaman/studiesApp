import React, { Component } from "react";
import styled from "styled-components";
import Cards from "../components/Cards";
import * as faker from "faker";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ClassCategorie from "../components/ClassCategorie";
import Course from "../components/Course";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        content
      }
    }
  }
`;

function mapStateToprops(state) {
  return {
    action: state.action,
    name: faker.name.firstName(),
    Lastname: faker.name.lastName(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU",
      }),
  };
}

class HomeScreen extends Component {
  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
  };
  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);
    if (Platform.OS == "android") statusbar.setBarStyle("light-content", true);
  }

  componentDidMount() {
    this.toggleMenu();
  }
  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5,
      }).start();
      StatusBar.setBarStyle("light-content", true);
    }
    if (this.state.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1,
      }).start();
      StatusBar.setBarStyle("dark-content", true);
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity,
          }}
        >
          <SafeAreaView>
            <ScrollView>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: "absolute", top: 0, left: 10 }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title> Welcome back</Title>
                <Wrapper>
                  <Name>{this.props.name} </Name>
                  <Lastname>{this.props.Lastname}</Lastname>
                </Wrapper>

                <Ionicons
                  name="ios-notifications"
                  size={32}
                  color="#4775f2"
                  style={{ position: "absolute", right: 20, top: 5 }}
                />
              </TitleBar>
              <ScrollView
                style={{ paddingTop: 30 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {categories.map((categorie, index) => (
                  <ClassCategorie key={index} text={categorie.text} />
                ))}
              </ScrollView>
              <Subtitle>{"continue learning".toUpperCase()}</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                <Query query={CardsQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <Message>Loading...</Message>;
                    if (error) return <Message>Error...</Message>;
                    console.log(data.cardsCollection.items);
                    return (
                      <CardsContainer>
                        {data.cardsCollection.items.map((card, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              navigation.navigate("Section", {
                                section: card,
                              });
                            }}
                          >
                            <Cards
                              title={card.title}
                              image={card.image}
                              caption={card.caption}
                              logo={card.logo}
                              subtitle={card.subtitle.toUpperCase()}
                              content={cards.content}
                            />
                          </TouchableOpacity>
                        ))}
                      </CardsContainer>
                    );
                  }}
                </Query>
              </ScrollView>
              <Subtitle>{"Porpular Courses".toUpperCase()}</Subtitle>
              <CoursesContainer>
                {courses.map((course, index) => (
                  <Course
                    key={index}
                    title={course.title}
                    image={course.image}
                    subtitle={course.subtitle}
                    avatar={course.avatar}
                    caption={course.caption}
                    author={course.author}
                  />
                ))}
              </CoursesContainer>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}
export default connect(mapStateToprops, mapDispatchToProps)(HomeScreen);
const RootView = styled.View`
  background: black;
  flex: 1;
`;
const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
`;
const CardsContainer = styled.View`
  flex-direction: row;
  padding-left: 10px;
`;
const Message = styled.Text`
margin:20px
color:#b8bece
font-size: 15px
font-weight:500

`;
const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;
const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-radius: 10px;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const Title = styled.Text`
  color: #b8bece;
  font-size: 16px;
  font-weight: 500;
`;
const Wrapper = styled.View`
  flex-direction: row;
`;
const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;
const Lastname = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;
const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const categories = [
  {
    text: "LOWER PRIMARY",
  },
  {
    text: "UPPER PRIMARY",
  },
  {
    text: "SENIOR HIGH",
  },
];

const cards = [
  {
    title: "English For Lower Primary",
    image: require("../assets/background7.jpg"),
    subtitle: "Engish Languge",
    caption: "2 of 30 sections",
    logo: require("../assets/logo1.png"),
    pdf: require("../assets/multiplication.pdf"),
  },
  {
    title: "Maths For Lower Primary",
    image: require("../assets/background2.jpg"),
    subtitle: "Mathematics",
    caption: "8 of 15 sections",
    logo: require("../assets/logo2.png"),
    pdf: require("../assets/multiplication.pdf"),
  },

  {
    title: "Science For Lower Primary",
    image: require("../assets/background3.jpg"),
    subtitle: "Integrated Science",
    caption: "5 of 20 sections",
    logo: require("../assets/logo3.jpg"),
    pdf: require("../assets/multiplication.pdf"),
  },
  {
    title: "English For Upper Primary",
    image: require("../assets/background4.jpg"),
    subtitle: "Engish Languge",
    caption: "2 of 30 sections",
    logo: require("../assets/logo1.png"),
    pdf: require("../assets/multiplication.pdf"),
  },
  {
    title: "Maths For Upper Primary",
    image: require("../assets/background5.jpg"),
    subtitle: "Mathematics",
    caption: "1 of 40 sections",
    logo: require("../assets/logo2.png"),
    pdf: require("../assets/multiplication.pdf"),
  },
  {
    title: "Science For Upper Primary",
    image: require("../assets/background6.png"),
    subtitle: "Integrated Science",
    caption: "2 of 30 sections",
    logo: require("../assets/logo3.jpg"),
    pdf: require("../assets/multiplication.pdf"),
  },
];

const courses = [
  {
    title: "Essay Writting",
    subtitle: "50 sections",
    image: require("../assets/english.jpg"),
    author: "Felix Amoquandoh",
    avatar: require("../assets/profile.jpg"),
    caption: "Complete guide to writting good essays",
  },
  {
    title: "Algebric Expression",
    subtitle: "20 sections",
    image: require("../assets/algebra.jpg"),
    author: "Felix Amoquandoh",
    avatar: require("../assets/profile.jpg"),
    caption: "Simple steps to understanding algebras",
  },
  {
    title: "Human Skeleton",
    subtitle: "10 sections",
    image: require("../assets/science.jpg"),
    author: "Felix Amoquandoh",
    avatar: require("../assets/profile.jpg"),
    caption: "Basic explanations to human skeletal parts",
  },
];
