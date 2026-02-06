"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { getUserInfo } from "@/middleware/auth";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CSVLink } from "react-csv";

export default function ClientPage({
  createActivity,
  deleteEnrollById,
  updateActivityById,
  enrollActivity,
  deleteActivityById,
}) {
  const [userInfo, setUserInfo] = useState(null);
  const [myTeamInfo, setMyTeamInfo] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activitiesAlreadyEnrolled, setActivitiesAlreadyEnrolled] = useState(
    [],
  );
  const [enrollByActivityID, setEnrollByActivityID] = useState({});
  const [campus, setCampus] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await getUserInfo();
      setUserInfo(response);
      if (response != null) {
        const responseTeam = await fetch(
          process.env.API_URI + "/teams/" + response._id,
        ).then((resp) => resp.json());
        setMyTeamInfo(responseTeam.body);
        if (responseTeam.body == null) return;
        console.log(responseTeam.body);
        const options = [
          {
            value: response.name + " " + response.surname,
            label: response.name + " " + response.surname,
            disabled: false,
          },
        ];
        if (responseTeam.body.members != "") {
          JSON.parse(responseTeam.body.members).map((elem) => {
            options.push({
              value: elem[0] + " " + elem[1],
              label: elem[0] + " " + elem[1],
              disabled: false,
            });
          });
        }
        setOptions(options);
        const responseActivityEnrolled = await fetch(
          process.env.API_URI + "/enroll/team/" + responseTeam.body._id,
        ).then((resp) => resp.json());
        const allActivityId = [];
        responseActivityEnrolled.map((ele) =>
          allActivityId.push(ele.idActivity),
        );
        setActivitiesAlreadyEnrolled(allActivityId);
        console.log(allActivityId);
      }
    }
    async function fetchActivities() {
      const response = await fetch(process.env.API_URI + "/activities/").then(
        (resp) => resp.json(),
      );
      if (response == null) return;
      setActivities(response);
      const enrollByActivityID = {};
      const allEnroll = await fetch(process.env.API_URI + "/enroll/").then(
        (resp) => {
          return resp.json();
        },
      );
      allEnroll.map((elem) => {
        if (elem.idActivity in enrollByActivityID) {
          enrollByActivityID[elem.idActivity].push(elem);
        } else {
          enrollByActivityID[elem.idActivity] = [elem];
        }
      });
      console.log(enrollByActivityID);
      setEnrollByActivityID(enrollByActivityID);
    }
    fetchData();
    fetchActivities();
  }, []);

  const saveActivity = () => {
    setActivities([
      ...activities,
      {
        name: document.getElementById("name").value,
        description: document.getElementById("desc").value,
        organizer: document.getElementById("organizer").value,
        location: document.getElementById("location").value,
        time: document.getElementById("time").value,
        numberOfPointsAvailable: document.getElementById(
          "numberOfPointsAvailable",
        ).value,
        numberOfContestantByTeam: document.getElementById(
          "numberOfContestantByTeam",
        ).value,
        numberOfContestantMax: document.getElementById("numberOfContestantMax")
          .value,
        campus: campus,
      },
    ]);
    createActivity(
      document.getElementById("name").value,
      document.getElementById("desc").value,
      document.getElementById("organizer").value,
      document.getElementById("location").value,
      document.getElementById("time").value,
      document.getElementById("numberOfPointsAvailable").value,
      document.getElementById("numberOfContestantByTeam").value,
      document.getElementById("numberOfContestantMax").value,
      campus,
    );
  };

  const updateActivity = (idActivity, idxActivity) => {
    const updateActivity = activities.slice();
    updateActivity[idxActivity] = {
      name: document.getElementById("name").value,
      description: document.getElementById("desc").value,
      organizer: document.getElementById("organizer").value,
      location: document.getElementById("location").value,
      time: document.getElementById("time").value,
      numberOfPointsAvailable: document.getElementById(
        "numberOfPointsAvailable",
      ).value,
      numberOfContestantByTeam: document.getElementById(
        "numberOfContestantByTeam",
      ).value,
      numberOfContestantMax: document.getElementById("numberOfContestantMax")
        .value,
      campus: campus,
    };
    setActivities(updateActivity);
    updateActivityById(
      idActivity,
      document.getElementById("name").value,
      document.getElementById("desc").value,
      document.getElementById("organizer").value,
      document.getElementById("location").value,
      document.getElementById("time").value,
      document.getElementById("numberOfPointsAvailable").value,
      document.getElementById("numberOfContestantByTeam").value,
      document.getElementById("numberOfContestantMax").value,
      campus,
    );
  };

  const enroll = (
    idActivity,
    numberOfContestantMax,
    numberOfContestantByTeam,
  ) => {
    enrollActivity(
      idActivity,
      myTeamInfo._id,
      myTeamInfo.name,
      JSON.stringify(selected),
      numberOfContestantMax,
      numberOfContestantByTeam,
    );
    location.reload();
  };

  return (
    <main className="flex flex-col align-middle justify-center">
      <section className="flex px-8 justify-center items-center text-center">
        <main className="w-7xl">
          <Dialog>
            <header className="grid grid-cols-3 grid-rows-1 gap-8 justify-between w-full ml-auto">
              <div></div>
              <h2 className="text-4xl font-bold mb-8 font-hungry">
                Les activités
              </h2>
              {userInfo == null ? null : userInfo.admin ? (
                <div className={"flex justify-end"}>
                  <DialogTrigger asChild>
                    <Button className={"cursor-pointer"}>
                      Ajouter une activité
                    </Button>
                  </DialogTrigger>
                </div>
              ) : null}
            </header>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Ajouter une activité</DialogTitle>
                <DialogDescription>
                  Tous les champs avec une * sont obligatoires
                </DialogDescription>
              </DialogHeader>
              <main>
                <div>
                  <Field className="pb-4">
                    <FieldLabel htmlFor="name">Nom de l'activité *</FieldLabel>
                    <Input
                      id="name"
                      required
                      placeholder="Le nom de l'activité"
                    ></Input>
                  </Field>
                  <Field className="pb-4">
                    <FieldLabel htmlFor="desc">
                      Description de l'activité
                    </FieldLabel>
                    <Textarea
                      id="desc"
                      placeholder="La description de l'activité"
                    ></Textarea>
                  </Field>
                  <Field className="pb-4">
                    <FieldLabel htmlFor="organizer">
                      Nom de l'organisateur *
                    </FieldLabel>
                    <Input
                      id="organizer"
                      required
                      placeholder="Le nom de l'organisateur"
                    ></Input>
                  </Field>
                  <Field className="pb-4">
                    <FieldLabel>Campus *</FieldLabel>
                    <Select
                      value={campus}
                      onValueChange={(value) => {
                        setCampus(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Campus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="bordeaux">Bordeaux</SelectItem>
                          <SelectItem value="paris">Paris</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field className="pb-4">
                    <FieldLabel htmlFor="location">Salle *</FieldLabel>
                    <Input
                      id="location"
                      required
                      placeholder="Le lieu de l'activité"
                    ></Input>
                  </Field>
                  <Field className="pb-4">
                    <FieldLabel htmlFor="time">Horaires *</FieldLabel>
                    <Input
                      id="time"
                      required
                      placeholder="Les horaires de l'activité"
                    ></Input>
                  </Field>
                  <Field className="pb-4">
                    <FieldLabel htmlFor="numberOfPointsAvailable">
                      Points à gagner *
                    </FieldLabel>
                    <Input
                      type="number"
                      id="numberOfPointsAvailable"
                      required
                      placeholder="Le nombre de points à gagner"
                    ></Input>
                  </Field>
                  <Field className="pb-4">
                    <FieldLabel htmlFor="numberOfContestantByTeam">
                      Nombre de participants PAR EQUIPE *
                    </FieldLabel>
                    <Input
                      type="number"
                      id="numberOfContestantByTeam"
                      required
                      placeholder="Le nombre de participants par groupe"
                    ></Input>
                  </Field>
                  <Field className="pb-4">
                    <FieldLabel htmlFor="numberOfContestantMax">
                      Nombre de participants EN TOUT *
                    </FieldLabel>
                    <Input
                      type="number"
                      id="numberOfContestantMax"
                      required
                      placeholder="Le nombre de participants par groupe"
                    ></Input>
                  </Field>
                </div>
              </main>
              <DialogFooter>
                <section className="flex justify-between w-full">
                  <div className="ml-auto flex gap-2">
                    <DialogClose asChild>
                      <Button variant="outline" className={"cursor-pointer"}>
                        Annuler
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        onClick={saveActivity}
                        type="submit"
                        className={"cursor-pointer"}
                      >
                        Sauvegarder
                      </Button>
                    </DialogClose>
                  </div>
                </section>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <section className="flex gap-4 w-full justify-center mb-8 flex-wrap">
            {activities == null && Object.keys(enrollByActivityID) != 0
              ? null
              : activities.map((elem, idx) => {
                  userInfo == null ||
                  myTeamInfo == null ||
                  userInfo.campus == elem.campus ? (
                    <Dialog key={idx}>
                      <Card
                        key={idx}
                        className="md:flex-1/4 md:basis-[30%] md:grow-0 justify-center"
                      >
                        <CardHeader>
                          <h4 className="text-xl font-semibold">
                            {elem.name} - {elem.organizer}
                          </h4>
                          <h2>
                            {elem.location} - {elem.time}
                          </h2>
                          <h2>
                            Nombre de personnes par équipe :{" "}
                            {elem.numberOfContestantByTeam}
                          </h2>
                        </CardHeader>
                        <CardContent>{elem.description}</CardContent>
                        <CardFooter className="flex justify-between text-sm">
                          <h2>
                            Nombre d'inscrits :{" "}
                            {enrollByActivityID[elem._id] == undefined
                              ? 0
                              : enrollByActivityID[elem._id].length *
                                elem.numberOfContestantByTeam}
                            /{elem.numberOfContestantMax}
                          </h2>
                          {activitiesAlreadyEnrolled.includes(elem._id) ? (
                            <Button
                              onClick={() => {
                                deleteEnrollById(
                                  enrollByActivityID[elem._id].find(
                                    (o) => o.idTeam == myTeamInfo._id,
                                  )._id,
                                );
                                location.reload();
                              }}
                              className="relative cursor-pointer"
                            >
                              Supprimer son inscription
                            </Button>
                          ) : (
                            <DialogTrigger asChild>
                              <Button
                                className="relative cursor-pointer"
                                disabled={
                                  userInfo == null ||
                                  myTeamInfo == null ||
                                  userInfo.admin ||
                                  (enrollByActivityID[elem._id] == undefined
                                    ? false
                                    : enrollByActivityID[elem._id].length *
                                        elem.numberOfContestantByTeam >=
                                      elem.numberOfContestantMax)
                                }
                              >
                                S'inscrire
                              </Button>
                            </DialogTrigger>
                          )}
                        </CardFooter>
                        {userInfo == null ? null : userInfo.admin ? (
                          <aside className="flex justify-center gap-4">
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                onClick={() => setCampus(elem.campus)}
                                className={"cursor-pointer"}
                              >
                                Modifier
                              </Button>
                            </DialogTrigger>
                            <Button
                              variant="outline"
                              className={"cursor-pointer"}
                              onClick={() => {
                                deleteActivityById(elem._id);
                                location.reload();
                              }}
                            >
                              Supprimer
                            </Button>
                            <CSVLink
                              filename={`ListeParticipants-${elem.name}-${elem.location}`}
                              data={
                                enrollByActivityID[elem._id] == undefined
                                  ? []
                                  : enrollByActivityID[elem._id]
                              }
                            >
                              <Button
                                variant="outline"
                                className={"cursor-pointer"}
                                onClick={() => {
                                  deleteActivityById(elem._id);
                                  location.reload();
                                }}
                              >
                                Télécharger
                              </Button>
                            </CSVLink>
                          </aside>
                        ) : null}
                      </Card>
                      {userInfo == null ? null : userInfo.admin ? (
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Ajouter une activité</DialogTitle>
                            <DialogDescription>
                              Tous les champs avec une * sont obligatoires
                            </DialogDescription>
                          </DialogHeader>
                          <main>
                            <div>
                              <Field className="pb-4">
                                <FieldLabel htmlFor="name">
                                  Nom de l'activité *
                                </FieldLabel>
                                <Input
                                  defaultValue={elem.name}
                                  id="name"
                                  required
                                  placeholder="Le nom de l'activité"
                                ></Input>
                              </Field>
                              <Field className="pb-4">
                                <FieldLabel htmlFor="desc">
                                  Description de l'activité
                                </FieldLabel>
                                <Textarea
                                  defaultValue={elem.description}
                                  id="desc"
                                  placeholder="La description de l'activité"
                                ></Textarea>
                              </Field>
                              <Field className="pb-4">
                                <FieldLabel htmlFor="organizer">
                                  Nom de l'organisateur *
                                </FieldLabel>
                                <Input
                                  defaultValue={elem.organizer}
                                  id="organizer"
                                  required
                                  placeholder="Le nom de l'organisateur"
                                ></Input>
                              </Field>
                              <Field>
                                <FieldLabel htmlFor="surname">
                                  Campus
                                </FieldLabel>
                                <Select
                                  value={campus}
                                  onValueChange={(value) => {
                                    setCampus(value);
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Campus" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="bordeaux">
                                        Bordeaux
                                      </SelectItem>
                                      <SelectItem value="paris">
                                        Paris
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </Field>
                              <Field className="pb-4">
                                <FieldLabel htmlFor="location">
                                  Salle *
                                </FieldLabel>
                                <Input
                                  defaultValue={elem.location}
                                  id="location"
                                  required
                                  placeholder="Le lieu de l'activité"
                                ></Input>
                              </Field>
                              <Field className="pb-4">
                                <FieldLabel htmlFor="time">
                                  Horaires *
                                </FieldLabel>
                                <Input
                                  defaultValue={elem.time}
                                  id="time"
                                  required
                                  placeholder="Les horaires de l'activité"
                                ></Input>
                              </Field>
                              <Field className="pb-4">
                                <FieldLabel htmlFor="numberOfPointsAvailable">
                                  Points à gagner *
                                </FieldLabel>
                                <Input
                                  defaultValue={elem.numberOfPointsAvailable}
                                  type="number"
                                  id="numberOfPointsAvailable"
                                  required
                                  placeholder="Le nombre de points à gagner"
                                ></Input>
                              </Field>
                              <Field className="pb-4">
                                <FieldLabel htmlFor="numberOfContestantByTeam">
                                  Nombre de participants PAR EQUIPE *
                                </FieldLabel>
                                <Input
                                  defaultValue={elem.numberOfContestantByTeam}
                                  type="number"
                                  id="numberOfContestantByTeam"
                                  required
                                  placeholder="Le nombre de participants par groupe"
                                ></Input>
                              </Field>
                              <Field className="pb-4">
                                <FieldLabel htmlFor="numberOfContestantMax">
                                  Nombre de participants EN TOUT *
                                </FieldLabel>
                                <Input
                                  defaultValue={elem.numberOfContestantMax}
                                  type="number"
                                  id="numberOfContestantMax"
                                  required
                                  placeholder="Le nombre de participants par groupe"
                                ></Input>
                              </Field>
                            </div>
                          </main>
                          <DialogFooter>
                            <section className="flex justify-between w-full">
                              <div className="ml-auto flex gap-2">
                                <DialogClose asChild>
                                  <Button
                                    variant="outline"
                                    className={"cursor-pointer"}
                                  >
                                    Annuler
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button
                                    onClick={() =>
                                      updateActivity(elem._id, idx)
                                    }
                                    type="submit"
                                    className={"cursor-pointer"}
                                  >
                                    Sauvegarder
                                  </Button>
                                </DialogClose>
                              </div>
                            </section>
                          </DialogFooter>
                        </DialogContent>
                      ) : (
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>S'inscrire à {elem.name}</DialogTitle>
                            <DialogDescription>
                              Tous les champs avec une * sont obligatoires
                            </DialogDescription>
                          </DialogHeader>
                          <main>
                            <Field className="pb-4">
                              <FieldLabel htmlFor="contestants">
                                Choisis tes {elem.numberOfContestantByTeam}{" "}
                                champions *
                              </FieldLabel>
                              <MultiSelect
                                value={selected}
                                id="contestants"
                                options={options}
                                maxCount={0}
                                onValueChange={(value) => {
                                  setSelected(value);
                                }}
                                responsive={true}
                                hideSelectAll={true}
                              />
                            </Field>
                          </main>
                          <DialogFooter>
                            <section className="flex justify-between w-full">
                              <div className="ml-auto flex gap-2">
                                <DialogClose asChild>
                                  <Button
                                    variant="outline"
                                    className={"cursor-pointer"}
                                  >
                                    Annuler
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button
                                    disabled={
                                      selected.length !=
                                      elem.numberOfContestantByTeam
                                    }
                                    onClick={() =>
                                      enroll(
                                        elem._id,
                                        elem.numberOfContestantMax,
                                        elem.numberOfContestantByTeam,
                                      )
                                    }
                                    type="submit"
                                    className={"cursor-pointer"}
                                  >
                                    Sauvegarder
                                  </Button>
                                </DialogClose>
                              </div>
                            </section>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>
                  ) : null;
                })}
          </section>
        </main>
      </section>
    </main>
  );
}
