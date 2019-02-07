import httplib

headers = {
    'content-type': "application/json",
    'cache-control': "no-cache",
    'postman-token': "6625798a-6fd0-9b7c-e45f-2625927a99f7"
}
conn = httplib.HTTPConnection("localhost:3001")
i = 0
with open('schedule.csv') as f:
    lines = f.readlines()
for line in lines:
    line = line.strip()
    values = line.split(" ")

    if len(values) < 6:
        print line
        continue
    else:
        i+=1

    values[1:7] = values[:6]
    values[0] = str(i)
    print values
    payload = "{\n\t\"number\":" + values[0] + ",\n\t\"r1\":" + values[1]+ ",\n\t\"r2\":" + values[2]+ ",\n\t\"r3\":" + values[3] + ",\n\t\"b1\":" + values[4]+ ",\n\t\"b2\":" + values[5]+ ",\n\t\"b3\":" + values[6]+ "\n}"

    conn.request("POST", "/scouting/insertMatch", payload, headers)

    res = conn.getresponse()
    data = res.read()

    print(data.decode("utf-8"))
    print("done?")
