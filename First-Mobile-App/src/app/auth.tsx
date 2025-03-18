import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";
import { Toast } from "react-native-toast-notifications";
import { useAuth } from "../providers/auth-provider";
import { Redirect } from "expo-router";

const authSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(5, { message: "Password must be 6 or more characters long" }),
});

// Created a auth schema using zod to help manage types better.
// This also will help set our resolvers for our form

const Auth = () => {

  const {session} = useAuth();


  if(session) return <Redirect href={"/"} />

  // get our session and redirect us if a a session exists 

 
  
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Above, destructures control, handleSubmit and formState from useForm
  // Also uses the auth schema to set as our fesolvers for our form.
  // Also sets the default values

  const signIn = async (data: zod.infer<typeof authSchema>) => {
    const { error } = await supabase.auth.signInWithPassword(data)

    if(error){
      alert(error.message)
    }else{
      Toast.show("Signed in Successfully", {
        type: "success",
        placement: "top",
        duration: 1500,
      })
    }
    
  };

    // Our sign in function uses supabase.auth.signInWithPassword to handle our sign in data 

  const signUp = async (data: zod.infer<typeof authSchema>) => {
    const { error } = await supabase.auth.signUp(data)

    if(error){
      alert(error.message)
    }else{
      Toast.show("Signed Up Successfully", {
        type: "success",
        placement: "top",
        duration: 1500,
      })
    }
  };

  // Our and sign up function uses supabase.auth.signUp to handle our sign up data 

  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      }}
      style={styles.backgroundImage}
    >
      {/* Above imports our background image from our url.  */}
      {/* We use ImageBackground for display of our background.  */}
      <View style={styles.overlay}></View>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Please Authenticate to continue</Text>

        <Controller
          control={control}
          name="email"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholderTextColor={"#aaa"}
                autoCapitalize="none"
                editable={!formState.isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />
        {/* Controller for our email  */}
        {/* We destructure field and field State from render  */}
        {/* We return a TextInput and use our props from field and field state to customize the input.   */}
        <Controller
          control={control}
          name="password"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholderTextColor={"#aaa"}
                secureTextEntry
                autoCapitalize="none"
                editable={!formState.isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />

        <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(signIn)}
        disabled ={formState.isSubmitting}
        >
          <Text style={styles.buttonText}>Sign In </Text>
        </TouchableOpacity>


        <TouchableOpacity
        style={[styles.button, styles.signUpButton]}
        onPress={handleSubmit(signUp)}
        disabled ={formState.isSubmitting}
        >
          <Text style={styles.buttonText}>Sign Up </Text>
        </TouchableOpacity>

        {/* Above are our buttons responsible for when a user signs in or signs up */}
      </View>
    </ImageBackground>
  );
};

export default Auth;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#ddd",
    marginBottom: 32,
  },
  input: {
    width: "90%",
    padding: 12,
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#6a1b9a",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: "90%",
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "transparent",
    borderColor: "#fff",
    borderWidth: 1,
  },
  signUpButtonText: {
    color: "#fff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 16,
    textAlign: "left",
    width: "90%",
  },
});
