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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";
import { Input } from "./ui/input";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const Ejercicio4 = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async (): Promise<Post[]> => {
    const resp = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
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
  return (
    <div className="flex justify-center align-middle m-auto text-center w-[75%]">
      <Card>
        <CardHeader>
          <CardTitle>Ejercicio 4</CardTitle>
          <CardDescription>Consumir la API de JSON Placeholder</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="ID" />
            <Input placeholder="Title" />
            <Input placeholder="Body" />
            <Input placeholder="User ID" />
            <Button>
              <Plus />
            </Button>
          </div>
          <Table>
            <TableCaption>Aqui puede realizar sus operaciones</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">ID</TableHead>
                <TableHead>Titulo</TableHead>
                <TableHead>Cuerpo</TableHead>
                <TableHead className="text-right">ID Usuario</TableHead>
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
                        deletePost(idx);
                        const newPosts = [...posts];
                        newPosts.splice(idx, 1);
                        setPosts(newPosts);
                      }}
                    >
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
