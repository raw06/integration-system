<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class AssignRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'assign:role {--email=} {--role=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'assign role for user';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->line('Start assign role...');
        $email = $this->option('email');
        $role = (int)$this->option('role');

        try {
             User::query()->where('email', $email)->update(['role' => $role]);
             $this->line('Finished');
        } catch (\Exception $exception) {
            $this->line("Failed to assign ${exception}");
        }
    }
}
