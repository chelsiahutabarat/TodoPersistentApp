import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  createdAt: string;
};

const STORAGE_KEY = "TODOS";
const THEME_KEY = "THEME";

export default function HomeScreen() {
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("Pribadi");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sortType, setSortType] = useState("Terbaru");

  useEffect(() => {
    loadTodos();
    loadTheme();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  useEffect(() => {
    saveTheme();
  }, [darkMode]);

  const loadTodos = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data) {
        setTodos(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(todos)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const loadTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem(THEME_KEY);

      if (theme) {
        setDarkMode(JSON.parse(theme));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveTheme = async () => {
    try {
      await AsyncStorage.setItem(
        THEME_KEY,
        JSON.stringify(darkMode)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = () => {
    if (todo.trim() === "") {
      Alert.alert(
        "Peringatan",
        "Todo tidak boleh kosong"
      );
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: todo,
      completed: false,
      category: category,
      createdAt: new Date().toLocaleString(),
    };

    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  const deleteTodo = (id: string) => {
    Alert.alert(
      "Konfirmasi",
      "Yakin ingin menghapus todo ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            setTodos(
              todos.filter(
                (item) => item.id !== id
              )
            );
          },
        },
      ]
    );
  };

  const clearAll = () => {
    Alert.alert(
      "Hapus Semua",
      "Semua todo akan dihapus",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          onPress: async () => {
            setTodos([]);
            await AsyncStorage.removeItem(
              STORAGE_KEY
            );
          },
        },
      ]
    );
  };

  const filteredTodos = todos
    .filter((item) =>
      item.text
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "Terbaru") {
        return Number(b.id) - Number(a.id);
      }

      return a.text.localeCompare(b.text);
    });

  const total = todos.length;

  const completed = todos.filter(
    (item) => item.completed
  ).length;
    return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: darkMode ? "#121212" : "#FFFFFF",
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: darkMode ? "#FFFFFF" : "#000000",
          },
        ]}
      >
        📋 Todo Persistent App
      </Text>

      <View style={styles.themeRow}>
        <Text
          style={{
            color: darkMode ? "#FFFFFF" : "#000000",
            fontSize: 16,
          }}
        >
          🌙 Dark Mode
        </Text>

        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
        />
      </View>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#000000",
          },
        ]}
        placeholder="Masukkan Todo..."
        placeholderTextColor="#888"
        value={todo}
        onChangeText={setTodo}
      />

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#000000",
          },
        ]}
        placeholder="Kategori (Kuliah / Pribadi / Kerja)"
        placeholderTextColor="#888"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={addTodo}
      >
        <Text style={styles.buttonText}>
          Tambah Todo
        </Text>
      </TouchableOpacity>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#000000",
          },
        ]}
        placeholder="Cari Todo..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          setSortType(
            sortType === "Terbaru"
              ? "A-Z"
              : "Terbaru"
          )
        }
      >
        <Text style={styles.buttonText}>
          Sorting : {sortType}
        </Text>
      </TouchableOpacity>

      <View style={styles.stats}>
        <Text
          style={{
            color: darkMode ? "#FFF" : "#000",
          }}
        >
          Total : {total}
        </Text>

        <Text
          style={{
            color: darkMode ? "#FFF" : "#000",
          }}
        >
          Selesai : {completed}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearAll}
      >
        <Text style={styles.buttonText}>
          🗑 Hapus Semua
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              marginTop: 50,
              color: darkMode ? "#FFF" : "#555",
              fontSize: 18,
            }}
          >
            📭 Belum ada Todo
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              {
                backgroundColor: darkMode
                  ? "#222"
                  : "#F5F5F5",
              },
            ]}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() =>
                toggleTodo(item.id)
              }
            >
              <Text
                style={{
                  fontSize: 17,
                  color: darkMode
                    ? "#FFF"
                    : "#000",
                  textDecorationLine:
                    item.completed
                      ? "line-through"
                      : "none",
                  fontWeight: "600",
                }}
              >
                {item.text}
              </Text>

              <Text
                style={{
                  color: "#666",
                  fontSize: 13,
                  marginTop: 5,
                }}
              >
                📂 {item.category}
              </Text>

              <Text
                style={{
                  color: "#888",
                  fontSize: 12,
                }}
              >
                🕒 {item.createdAt}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                deleteTodo(item.id)
              }
            >
              <Text style={styles.deleteText}>
                Hapus
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  themeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },

  clearButton: {
    backgroundColor: "#FF3B30",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 5,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },

  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  deleteText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});