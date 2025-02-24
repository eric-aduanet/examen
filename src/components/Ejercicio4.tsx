import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const userFormSchema = z.object({
  id: z.string().transform((val) => {
    const parsedVal = parseInt(val);
    if (isNaN(parsedVal)) {
      throw new Error("El ID debe ser un numero");
    }
    return parsedVal;
  }),
  title: z
    .string({
      message: "El titulo debe ser un string",
    })
    .min(1, {
      message: "Debe haber al menos un caracter",
    }),
  body: z
    .string({
      message: "El cuerpo debe ser un string",
    })
    .min(1, {
      message: "Debe haber al menos un caracter",
    }),
  userId: z.string().transform((val) => {
    const parsedVal = parseInt(val);
    if (isNaN(parsedVal)) {
      throw new Error("El ID del usuario debe ser un numero");
    }
    return parsedVal;
  }),
});

export const Ejercicio4 = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [mockPost, setMockPost] = useState<Post>();
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
  });
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [action, setAction] = useState<"Agregar usuario" | "Editar usuario">(
    "Agregar usuario"
  );

  const handlePage = (value: number) => {
    if (value < 1 || value > 10) return;
    setPage(value);
  };
  const getPosts = async (): Promise<Post[]> => {
    const resp = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}`
    );
    return resp.data;
  };

  const newPost = async (post: Post) => {
    const resp = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      post,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log(resp);
  };

  const updatePost = async (postId: number, post: Post) => {
    const resp = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      post,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log(resp);
  };

  const deletePost = async (postId: number) => {
    const resp = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    console.log(resp);
  };

  useEffect(() => {
    getPosts().then((posts) => {
      console.log(posts);
      setPosts(posts);
    });

    newPost({ id: 1, title: "Hello", body: "World", userId: 1 });
    updatePost(1, {
      id: 1,
      title: "Hello",
      body: "World",
      userId: 1,
    });
    deletePost(1);
  }, []);

  useEffect(() => {
    setPosts([]);
    getPosts().then((posts) => {
      setPosts(posts);
    });
  }, [page]);

  return (
    <div className="flex justify-center align-middle m-auto text-center w-[75%]">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ejercicio 4</CardTitle>
          <CardDescription>Consumir la API de JSON Placeholder</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-2 justify-end">
            <Button
              onClick={() => {
                setAction("Agregar usuario");
                setDialogOpen(true);
                setMockPost(undefined);
              }}
            >
              <Plus />
              Nuevo registro
            </Button>
          </div>
          {/* Si no hay posts cargados mostrar un icono de carga */}
          {posts.length === 0 ? (
            <LoadingSpinner className="w-full m-auto h-[75px]" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">ID</TableHead>
                  <TableHead>Titulo</TableHead>
                  <TableHead>Cuerpo</TableHead>
                  <TableHead className="text-right">ID Usuario</TableHead>
                  <TableHead />
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((elem, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{elem.id}</TableCell>
                    <TableCell>{elem.title}</TableCell>
                    <TableCell>{elem.body}</TableCell>
                    <TableCell className="text-right">{elem.userId}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          // Cada botón se crea con su respectiva función que manda a eliminarse a sí mismo
                          deletePost(elem.id)
                            .then(() => {
                              const newPosts = [...posts];
                              newPosts.splice(idx, 1);
                              setPosts(newPosts);
                              toast.success(
                                "Se borró el registro exitosamente"
                              );
                            })
                            .catch(() => {
                              toast.error(
                                "Hubo un error al borrar el registro"
                              );
                            });
                        }}
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setAction("Editar usuario");
                          setSelectedUserId(elem.id);
                          setDialogOpen(true);
                          setMockPost(elem);
                        }}
                      >
                        <Pencil />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {/* La paginación de la tabla */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePage(page - 1)} />
              </PaginationItem>
              {/* Código para mostrar las páginas navegables */}
              {Array.from({ length: 5 }, (_, idx) => {
                let offset = page + 5 - 11;
                offset = offset > 0 ? offset : 0;
                return (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      onClick={() => handlePage(idx + page - offset)}
                      isActive={page === idx + page - offset}
                    >
                      {idx + page - offset}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext onClick={() => handlePage(page + 1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
      {/* El modal para la creación/edición del usuario, tiene dentro un formulario que manda a llamar un POST o un PUT dependiendo de la acción */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{action}</DialogTitle>
          </DialogHeader>
          <div className="mb-9 p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(
                  (values: z.infer<typeof userFormSchema>) => {
                    if (action == "Agregar usuario") {
                      newPost(values)
                        .then(() => {
                          setDialogOpen(false);
                          const newPosts = posts;
                          newPosts.push(values);
                          toast.success("Se agregó el usuario correctamente");
                        })
                        .catch(() => {
                          toast.error("No se pudo agregar el usuario");
                        });
                    } else {
                      updatePost(selectedUserId, values)
                        .then(() => {
                          setDialogOpen(false);
                          const newPosts = posts;
                          newPosts[(selectedUserId % 10) - 1] = values;
                          toast.success("Se editó el usuario correctamente");
                        })
                        .catch(() => {
                          toast.error("No se pudo editar el usuario");
                        });
                    }
                  }
                )}
              >
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={mockPost?.id.toString()}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder={mockPost?.title} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Body</FormLabel>
                      <FormControl>
                        <Input placeholder={mockPost?.body} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User ID</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={mockPost?.userId.toString()}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Guardar</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
