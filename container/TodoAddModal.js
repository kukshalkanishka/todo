import {Button, StyleSheet, Switch, TextInput, View, Text} from "react-native";
import {useState} from "react";
import uuid from 'react-native-uuid';

const {Modal, TouchableOpacity, Image} = require("react-native");

const todoType = {true: "work", false: "personal"}
export const TodoAddModal = ({visible, onTodoAdd, onClose}) => {
    const [todo, setTodo] = useState({id: uuid.v1()})
    const [isWork, setIsWork] = useState(false)
    const handleTodoNameChange = (name) => {
        setTodo(prevState => ({...prevState, name}))
    }

    const handleSwitchChange = () => {
        setIsWork(!isWork);
    }

    const handleClose = () => {
        onClose();
        setTodo({id: uuid.v1()});
        setIsWork(false);
    }
    const handleTodoAdd = () => {
        onTodoAdd(todo, todoType[isWork]);
        handleClose();
    }

    return (
        <Modal visible={visible} animationType={"slide"}>
            <TouchableOpacity onPress={handleClose}>
                <Image style={styles.closeIcon} source={require("../assets/closeIcon.png")}></Image>
            </TouchableOpacity>
            <View style={styles.modal}>
                <TextInput
                    style={styles.input}
                    value={todo.name}
                    placeholder={"Enter a text"}
                    autoFocus={true}
                    onChangeText={handleTodoNameChange}
                />
                <View style={styles.switch}>
                    <Text>Work</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={'#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={handleSwitchChange}
                        value={isWork}
                    />
                    <Text>Personal</Text>
                </View>
                <Button title={"Create new todo"} onPress={handleTodoAdd}></Button>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modal: {
        padding: 30,
        height: "80%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        borderColor: "black",
        width: 200,
        height: 40,
        borderBottomWidth: 1,
        marginBottom: 40
    },
    closeIcon: {
        width: 50,
        height: 50,
        left: 0,
    },
    switch: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 40
    }
});