import sys
import select
import socket


if __name__ == "__main__":
    soc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    try:
        soc.connect(('10.151.3.106', 5000))
    except:
        print ('Not connected')
        sys.exit()

    print ('It is connected to server')

    while True:
        socketList = [sys.stdin, soc]
        read, write, error = select.select(socketList, [], [])

        for sock in read:
            if sock == soc:
                dataRecv = sock.recv(2048)
                if not dataRecv:
                    print ('\n It got disconnected from server')
                    sys.exit()
                elif dataRecv.decode() =="exit":
                    print ("Server connection is closed")
                    sys.exit()
                else:
                    print(dataRecv.decode())
            else:
                # user typed a message
                msg = input()
                soc.send(msg.encode("utf8"))

soc.close()