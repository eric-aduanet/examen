import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const Ejercicio3 = () => {
  const list: string[] = ["Eric", "Max", "Daniel", "Chuy", "Linda"];

  return (
    <div className="flex justify-center align-middle m-auto text-center">
      <Card>
        <CardHeader>
          <CardTitle>Ejercicio 3</CardTitle>
          <CardDescription>
            Mostrar una lista estatica de nombres
          </CardDescription>
        </CardHeader>
        <CardContent>
          {list.map((elem, idx) => (
            <div
              key={idx}
              className="rounded-md border p-4 space-x-4 text-left mt-4 mb-4"
            >
              <h1 className="text-1xl">{elem}</h1>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
