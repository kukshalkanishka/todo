import {StyleSheet, Text, View, Image, TouchableWithoutFeedback} from "react-native";
import {useState} from "react";

export const Todo = ({todo, type, onTodoDone}) => {
    const handleTodoPress = () => {
        onTodoDone(todo.id, type)
    };

    return (
        <TouchableWithoutFeedback onPress={handleTodoPress}>
            <View style={styles.todo}>
                {todo.done ?
                    <Image style={styles.checkbox} source={require("../assets/checkmark-checked.png")}></Image>
                    :
                    <Image style={styles.checkbox} source={require("../assets/checkmark-unchecked.png")}></Image>
                }
                <Text>{todo.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    todo: {
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    checkbox: {
        height: 30,
        width: 30,
        marginRight: 10
    }
});
