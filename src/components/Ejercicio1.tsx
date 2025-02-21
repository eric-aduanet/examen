import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const Ejercicio1 = () => {
  const [text, setText] = useState("Presionar");
  return (
    <div className="flex justify-center align-middle m-auto text-center">
      <Card>
        <CardHeader>
          <CardTitle>Ejercicio 1</CardTitle>
          <CardDescription>
            Crear un componente con un boton que cambie su texto al hacer clic
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setText("Presionado")}
            variant={text === "Presionado" ? "destructive" : "default"}
          >
            {text}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
