import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const Ejercicio2 = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="flex justify-center align-middle m-auto text-center">
      <Card>
        <CardHeader>
          <CardTitle>Ejercicio 2</CardTitle>
          <CardDescription>
            Crear un contador que incremente y disminuya al hacer clic en los
            botones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-5xl mb-4">{counter}</h1>
          <Button onClick={() => setCounter(counter + 1)} variant="default">
            +
          </Button>{" "}
          <Button onClick={() => setCounter(counter - 1)} variant="destructive">
            -
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
