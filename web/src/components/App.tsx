import React, { useState } from "react";
import "./App.css";
import { debugData } from "@/utils/debugData";
import { fetchNui } from "@/utils/fetchNui";
import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"


// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

interface ReturnClientDataCompProps {
  data: unknown;
}

const ReturnClientDataComp: React.FC<ReturnClientDataCompProps> = ({
  data,
}) => (
  <>
    <h5>Returned Data:</h5>
    <pre>
      <code>{JSON.stringify(data, null)}</code>
    </pre>
  </>
);

interface ReturnData {
  x: number;
  y: number;
  z: number;
}

const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
]

type CardProps = React.ComponentProps<typeof Card>

const App: React.FC = () => {
  const [clientData, setClientData] = useState<ReturnData | null>(null);

  const handleGetClientData = () => {
    fetchNui<ReturnData>("getClientData")
      .then((retData) => {
        console.log("Got return data from client scripts:");
        console.dir(retData);
        setClientData(retData);
      })
      .catch((e) => {
        console.error("Setting mock data due to error", e);
        setClientData({ x: 500, y: 300, z: 200 });
      });
  };

  return (
    <div className="nui-wrapper mt-28">
      <div className="popup-thing">
          <Card className={cn("w-[380px]")}>
              <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>You have 3 unread messages.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                      <BellRing />
                      <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                              Push Notifications
                          </p>
                          <p className="text-sm text-muted-foreground">
                              Send notifications to device.
                          </p>
                      </div>
                      <Switch />
                  </div>
                  <div>
                      {notifications.map((notification, index) => (
                          <div
                              key={index}
                              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                          >
                              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                              <div className="space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                      {notification.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                      {notification.description}
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>
              </CardContent>
              <CardFooter>
                  <Button className="w-full">
                      <Check className="mr-2 h-4 w-4" /> Mark all as read
                  </Button>
              </CardFooter>
          </Card>
      </div>
    </div>
  );
};

export default App;
